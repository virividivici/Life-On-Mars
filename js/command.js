// Command constructor to check input and clean it up for further processing
function Command(input) {
  this.userInput = this.verify(input);
  this.roboInstructions = [];
}

// if correct commands are entered pull them out and ignore the rest; wrong input returns false
Command.prototype.verify = function (input){

  // input regex, if new instruction letter gets added to program modify [LRF] in regex and adjust Robot.prototype accordingly
  var pGridAndCommands = /(\d+\s+\d+\s*\n+)((\d+\s+\d+\s*[NESW]{1}\s*\n+[LRF]+\s*\n*)+)/i;

  var verify = input.match(pGridAndCommands);
  if (!verify) {
    return false;
  } else {
    return verify[0];
  }
};

// deconstruct verified input
Command.prototype.processInput = function (){
  var pSplitLines = /[\r?\n]+/;
  var pGridDefinition = /\d{1,2}\s+\d{1,2}/;
  var pSplitWhitespace = /\s+/;
  var pDirection = /[NESW]/;
  var pInstruction = /[RLF]+/;

  // create array of input and throw out empty elements
  var lines = splitLines(this.userInput).filter(Boolean);

  function splitLines(string) {
    return string.split(pSplitLines);
  }

  // first line is always grid definition and gets shifted from lines array
  this.gridCoordinates = lines.shift().match(pGridDefinition)[0].split(pSplitWhitespace);

  // iterate over raw robot instruction; two elements form one robot instruction
  for (var i = 0; i < lines.length; i+=2) {
    var rawCoordinates = lines[i];
    var rawInstruction = lines [i+1];
    var xy = rawCoordinates.match(pGridDefinition)[0].split(pSplitWhitespace);
    var direction = rawCoordinates.match(pDirection)[0];
    var instruction = rawInstruction.match(pInstruction)[0];
    this.newRoboCommand(xy[0],xy[1],direction,instruction);
  }
};

// build roboInstructions object and push it to instructions array
Command.prototype.newRoboCommand = function newRoboCommand (x,y,direction,instruction) {
  var command = {
    x: x,
    y: y,
    direction: direction,
    instruction: instruction
  };
  this.roboInstructions.push(command);
};

module.exports = Command;