var global = require("./global.js");

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
      if (this.instruction.charAt(i) === 'L') {this.direction = (this.turnLeft(this.direction));}
      if (this.instruction.charAt(i) === 'R') {this.direction = (this.turnRight(this.direction));}
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
