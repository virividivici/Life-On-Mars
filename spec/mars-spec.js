var Mars = require("../js/mars.js");

describe("Given a new Mars", function () {
	var mars = new Mars([40, 10])
	it("with a height of 40 and width of 10 then", function () {
		expect(mars.width).toBe(41);
		expect(mars.height).toBe(11);
	});
	/**it("with a height of 51 then throw an error", function () {
		expect(function () { new Mars([2, 51])}).toThrow(new Error("Grid size cannot be greater than 50x50"));
	});
	it("with a width of 51 then throw an error", function () {
		expect(function () { new Mars([51, 1])}).toThrow(new Error("Grid size cannot be greater than 50x50"));
	});
	it("with a negative height then throw an error", function () {
		expect(function () { new Mars([45, -1])}).toThrow(new Error("Grid size cannot be smaller than 1x1"));
	});
	it("with a negative width then throw an error", function () {
		expect(function () { new Mars([-1, 30])}).toThrow(new Error("Grid size cannot be smaller than 1x1"));
	});	**/	
});