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
