import { describe, expect, it } from "vitest";
import {
	byMax,
	byMin,
	roundHalfDown,
	roundHalfEven,
	roundHalfUp,
	sum,
} from "./math";

describe("sum", () => {
	it("should sum the values", () => {
		const result = sum([{ price: 1 }, { price: 2 }], (x) => x.price);

		expect(result).toBe(3);
	});
});

describe("byMin", () => {
	it("should find by min value", () => {
		const result = [{ price: 1 }, { price: 2 }].reduce(byMin((x) => x.price));

		expect(result).toEqual({ price: 1 });
	});
});

describe("byMax", () => {
	it("should find by max value", () => {
		const result = [{ price: 1 }, { price: 2 }].reduce(byMax((x) => x.price));

		expect(result).toEqual({ price: 2 });
	});
});

describe("rounding", () => {
	it.each([
		[20.5, 20],
		[21.5, 22],
		[21.4, 21],
		[20.6, 21],
	])("should do half even rounding", (input, expected) => {
		expect(roundHalfEven(input)).toEqual(expected);
	});

	it.each([
		[20.5, 21],
		[21.5, 22],
	])("should do half up rounding", (input, expected) => {
		expect(roundHalfUp(input)).toEqual(expected);
	});

	it.each([
		[20.5, 20],
		[21.5, 21],
	])("should do half down rounding", (input, expected) => {
		expect(roundHalfDown(input)).toEqual(expected);
	});
});
