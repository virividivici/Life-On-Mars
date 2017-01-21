var global = require("../js/global.js");
var Robot = require("../js/robot.js");
var Mars = require("../js/Mars.js");

describe("Given a new Robot is created", function () {
	var s = new Mars([5,5]);
	global.mars = s;
	var robot = new Robot(1, 1, 'E', 'L');

	it("then it lands on Mars facing East", function () {
		var orientation = robot.direction;
		expect(orientation).toBe("E");
	});
	it("then it lands on Mars in the bottom left corner", function () {
		var position = robot.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(1);
	});
	it("then it lands on Mars it is not lost", function () {
		expect(robot.lost.toBeFalsy);
	});
	it("then it can turn left to face North", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("N");
	});
	
	
});


