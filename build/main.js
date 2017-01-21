/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var Command = __webpack_require__(2);
	var Mars = __webpack_require__(3);
	var Robot = __webpack_require__(4);
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Globals = {}

	module.exports = Globals;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	// set up Mars grid constructor
	function Mars (gridCoordinates) {

	  // add 1 to width and height so smallest possible grid has 4 cells when entered 0,0
	  this.width = parseInt(gridCoordinates[0]) + 1;
	  this.height = parseInt(gridCoordinates[1]) + 1;

	  // create cells array to push scented cells information
	  this.cells = new Array (this.height * this.width);
	}

	// check if cell is inside grid
	Mars.prototype.isInside = function (point) {
	  return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
	};

	// scent cell value
	Mars.prototype.scentAt = function (point) {
	  this.cells[point.y * this.width + point.x] = "scent";
	};

	// check value of cell
	Mars.prototype.valueAt = function (point) {
	  return this.cells[point.y * this.width + point.x];
	};

	module.exports = Mars;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);

	// Robot constructor to build single robots
	function Robot (x, y, direction, instruction) {
	  this.position = {
	        x:parseInt(x),
	        y:parseInt(y)
	  };
	  this.direction = direction;
	  this.instruction = instruction;
	  this.lost = false;
	}

	// execute instruction string
	Robot.prototype.move = function () {

	  // if initial robot position is not in grid it gets ignored
	  if (global.mars.isInside(this.position)) {
	    for (var i = 0; i < this.instruction.length; i++) {

	      // take into account yet defined instruction - add more instructions here
	      if (this.instruction.charAt(i) === 'L') { this.direction = (this.turnLeft(this.direction));}
	      if (this.instruction.charAt(i) === 'R') { this.direction = (this.turnRight(this.direction));}
	      if (this.instruction.charAt(i) === 'F') {
	        this.moveForward();

	        // break out of iterating when robot is lost
	        if (this.lost === true) {break;}
	      }
	    }

	    // push result of move operation to output array
	    if (this.lost === true) {
	      global.output.push(this.position.x + " " + this.position.y + " " + this.direction + " " + "LOST");
	    } else {
	      global.output.push(this.position.x + " " + this.position.y + " " + this.direction);
	    }
	  }
	};

	// turn direction 90 degrees left
	Robot.prototype.turnLeft = function (direction) {
	  var currentDir = ["N", "E", "S", "W"].indexOf(direction);
	  if(currentDir === 0){currentDir = 4;}
	    return ["N", "E", "S", "W"][currentDir - 1];
	};

	// turn direction 90 degrees right
	Robot.prototype.turnRight = function (direction) {
	  var currentDir = ["N", "E", "S", "W"].indexOf(direction);
	  if(currentDir === 3){currentDir = -1;}
	  return ["N", "E", "S", "W"][currentDir + 1];
	};

	// move robot one cell in current direction
	Robot.prototype.moveForward = function () {
	  var oldPosition = {x: this.position.x, y: this.position.y};

	  if (this.direction === "N") {this.position.y ++;}
	  if (this.direction === "E") {this.position.x ++;}
	  if (this.direction === "S") {this.position.y --;}
	  if (this.direction === "W") {this.position.x --;}

	  // check if new position is outside grid
	  if (global.mars.isInside(this.position) === false) {

	    // set position to before moving off grid
	    this.position = oldPosition;

	    // if this.position not scented mark robot as lost and scent position
	    if (global.mars.valueAt(this.position) !== "scent") {
	      global.mars.scentAt(this.position);
	      this.lost = true;
	    }
	  }
	};

	module.exports = Robot;


/***/ }
/******/ ]);