var global = require("./global.js");
var Command = require("./command.js");
var Mars = require("./mars.js");
var Robot = require("./robot.js");
// define global object to save current planet and output
//var global = {};

// initiate DOM with button functions
function initiate () {

  // iterate over robot instructions
  function startRobots (commands) {
    global.output = [];
    for (var i = 0; i < commands.length; i++) {
      var current = commands[i];
      var robot = new Robot (current.x, current.y, current.direction, current.instruction);
      robot.move();
    }
  }

  var goClick = document.getElementById("go");
  goClick.onclick = function run(){
    var input = document.getElementById("instructions").value;
    var command = new Command(input);
    if (!command.userInput) {
      alert("This input is invalid! Did you enter it in the correct format?");
    } else {
      command.processInput();
      if (command.gridCoordinates[0]>50 || command.gridCoordinates[1]>50) {
        alert("Maximum grid value is 50");
      }

      // only lay out grid and process robot instructions if input is correct
      else {
        // lay out current grid
        global.mars = new Mars (command.gridCoordinates);
        console.log(global.mars.cells.toString());
        // process all user instructions
        startRobots(command.roboInstructions);

        // push result to dom element
        document.getElementById("output").value = global.output.join("\n");
      }
    }
  };

  // reset the global object
  var clearClick = document.getElementById("clear");
  clearClick.onclick = function (){
    document.getElementById("instructions").value = "";
    document.getElementById("output").value = "";
    global = {};
  };
}

// automatically run initate when script loads
initiate();