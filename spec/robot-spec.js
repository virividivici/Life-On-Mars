var global = require("../js/global.js");
var Robot = require("../js/robot.js");
var Mars = require("../js/Mars.js");

describe("Given a new Robot is created", function () {
	var s = new Mars([5,5]);
	global.mars = s;
	global.output = [];

	var robot = new Robot(0, 0, 'E', 'R' );

	it("then it lands on Mars facing East", function () {
		var orientation = robot.direction;
		expect(orientation).toBe("E");
	});
	it("then it lands on Mars in the bottom left corner", function () {
		var position = robot.position;
		expect(position.x).toBe(0);
		expect(position.y).toBe(0);
	});
	it("then it lands on Mars it is not lost", function () {
		expect(robot.lost).toBeFalsy();
	});
	it("then it can turn Right to face South", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("S");
	});
	it("then it can turn Right to face West", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("W");
	});
	it("then it can turn Right to face North", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("N");
	});
	it("then it can turn Right to face East again", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("E");
	});

	it("then change command to be turning left", function() {
		robot.instruction = 'L';
		var command = robot.instruction;
		expect(command).toBe("L");
	});

	it("then it can turn left to face North", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("N");
	});

	it("then it can turn left to face West", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("W");
	});

	it("then it can turn left to face South", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("S");
	});

	it("then it can turn left to face East again", function() {
		robot.move();
		var orientation = robot.direction;
		expect(orientation).toBe("E");
	});

	it("then change command to be move forward and turn left", function() {
		robot.instruction = 'FL';
		var command = robot.instruction;
		expect(command).toBe("FL");
	});

	it("then move forward while facing East and turn left facing North", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(0);
		expect(robot.direction).toBe('N');
	});

	it("then move forward while facing North and turn left facing West", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(1);
		expect(robot.direction).toBe('W');
	});

	it("then move forward while facing West and turn left facing South", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(0);
		expect(position.y).toBe(1);
		expect(robot.direction).toBe('S');
	});

	it("then move forward while facing South and turn left facing East", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(0);
		expect(position.y).toBe(0);
		expect(robot.direction).toBe('E');
	});

	it("then move robot to 1X1 facing East", function() {
		robot.position.x = 1;
		robot.position.y = 1;
		var position = robot.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(1);
		expect(robot.direction).toBe('E');
	});

	it("then change command to be turn right and move forward", function() {
		robot.instruction = 'RF';
		var command = robot.instruction;
		expect(command).toBe("RF");
	});

	it("then turn right to face South and  move forward", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(0);
		expect(robot.direction).toBe('S');
	});

	it("then turn right to face West and  move forward", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(0);
		expect(position.y).toBe(0);
		expect(robot.direction).toBe('W');
	});

	it("then turn right to face North and  move forward", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(0);
		expect(position.y).toBe(1);
		expect(robot.direction).toBe('N');
	});

	it("then turn right to face East and  move forward", function() {
		robot.move();
		var position = robot.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(1);
		expect(robot.direction).toBe('E');
	});
});

describe("Given a new Mars with size of 5x3 is created", function () {
	var s = new Mars([5,3]);
	
	global.mars = s;
	global.output = [];

	var robot1 = new Robot(1, 1, 'E', 'RFRFRFRF');
	var robot2 = new Robot(3, 2, 'N', 'FRRFLLFFRRFLL');
	var robot3 = new Robot(0, 3, 'W', 'LLFFFLFLFL');
	it("then robot1 is created, lands on Mars successfully at 1x1xE ", function () {
		
		var orientation = robot1.direction;
		var position = robot1.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(1);
		expect(orientation).toBe("E");
	});

	it("then robot2 is created, lands on Mars successfully at 3x2xN", function () {
	
		var orientation = robot2.direction;
		var position = robot2.position;
		expect(position.x).toBe(3);
		expect(position.y).toBe(2);
		expect(orientation).toBe("N");
	});

	it("then robot3 is created, lands on Mars successfully at 0x3xW ", function () {
		
		var orientation = robot3.direction;
		var position = robot3.position;
		expect(position.x).toBe(0);
		expect(position.y).toBe(3);
		expect(orientation).toBe("W");
	});
	
	it("then RFRFRFRF should move robot1 to 1x1xE ", function () {
		robot1.move();
		var orientation = robot1.direction;
		var position = robot1.position;
		expect(position.x).toBe(1);
		expect(position.y).toBe(1);
		expect(orientation).toBe("E");
	});

	it("then FRRFLLFFRRFLL should lose robot2 at 3X3XN  ", function () {
		//expect(function () { robot2.move()}).toThrow(new Error("Robot2 is Lost"));
		robot2.move();
		var orientation = robot2.direction;
		var position = robot2.position;
		expect(position.x).toBe(3);
		expect(position.y).toBe(3);
		expect(orientation).toBe("N");
		expect(robot2.lost).toBeTruthy();
	});
    
    it("then LLFFFLFLFL should move robot3 to 2X3XS ", function () {

		robot3.move();
		var orientation = robot3.direction;
		var position = robot3.position;
		expect(position.x).toBe(2);
		expect(position.y).toBe(3);
		expect(orientation).toBe("S");
		expect(robot3.lost).toBeFalsy();
	});

	
});


