// configuration + loader
SystemJS.map.tslib =
  "https://cdnjs.cloudflare.com/ajax/libs/tslib/1.6.1/tslib.min.js";
SystemJS.import("common/math/MathEquationManager.js").then(ready);

var MathEquationManager; // the MathEquationManager class
var mem; // the MathEquationManager instance
var shanetexTA; // reference to shanetex text area
var latexTA; // reference to latex text area 
var stack = [];
var magicString = "4a5h36hh3z2s"; // something that won't ever be in a step (hopefully)

// called once the imports are loaded
function ready(memImport) {
  // create a converter
  MathEquationManager = memImport.MathEquationManager;
  mem = new MathEquationManager();

  // enable text areas after load
  shanetexTA = document.querySelector("#shanetex");
  latexTA = document.querySelector("#latex");
  shanetexTA.disabled = false;
  latexTA.disabled = false;

  shanetexTA.oninput = convertShanetex;
  convertShanetex();
}

// the conversion process
function convertShanetex()
{
  stack = [];
  const shaneTexLines = shanetexTA.value.split(/\r\n|\n|\r/g);
  //console.log(shaneTexLines);
  const shaneTexLinesWithVars = addVariables(shaneTexLines);
  //console.log(shaneTexLinesWithVars);
  const latexLines = shaneTexLinesWithVars.map(line => {
    try {
      const rawLatexLine = mem.generateDisplayLatexFromEquationString(line);
      const cleanedLatexLine = cleanLatex(rawLatexLine);
      return cleanedLatexLine;
    }
    catch (e) {
      return "ERROR: " + line + " (" + e + ")";
    }
  });

  //console.log("latexLines");
  //console.log(latexLines);

  console.log("After LaTeX conversion, but before variable injection.");
  console.log(latexLines);

  var newLatexLines = replaceVariables(latexLines);

  console.log("After LaTeX conversion AND variable injection.");
  console.log(newLatexLines);


  latexTA.value = newLatexLines.join("\n");
}

function addVariables(l) {
  for (var ii=0; ii<l.length; ii++) {
      var currentLine = l[ii];
      var regex = /\{(.*?)\}/g;
      let matched;
      while ((matched = regex.exec(l[ii])) !== null) {
        var obj = {line:ii, text:matched[0]};
        stack.push(obj);
        currentLine = currentLine.replace(matched[0], magicString);
        //console.log("Line after replace l[" + ii +  "]:" + l[ii]);
        console.log("Line after replace currentLine: " + currentLine);
    }
    l[ii] = currentLine;
  }
  console.log("Before LaTeX conversion");
  console.log(l);
  return l;
}

  function replaceVariables(latexLines) {
      // Loop through the array that holds the variables to be injected in place of the magic string
    for (jj=0; jj<stack.length; jj++) {
        var lineNum = stack[jj].line;
        var text = stack[jj].text;
        var replaceWith = "\\var" + text;
        latexLines[lineNum]=latexLines[lineNum].replace(magicString, replaceWith);
        console.log("LaTeX step " + lineNum + " replaced with " + replaceWith);
        console.log("NEW STEP: " + latexLines[lineNum]);
    }
    return latexLines;
  }

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

// you could put any additional string manipulation / cleanup work here
function cleanLatex(line)
{  
  // e.g. remove white-space before backslashes
  line = line.replace(/ \\/g, "\\");
  //console.log("Clean line: " + line);
  return line;
}