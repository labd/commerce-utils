import { describe, expect, it } from "vitest";
import { groupBy, groupByMap, isValue, unique, uniqueBy } from "./collection";

describe("isValue", () => {
	it("should get values from object", () => {
		const products = [
			{ id: "a", price: { centAmount: 20 } },
			{ id: "b", price: null },
			{ id: "c", price: { centAmount: 30 } },
		];
		const result = products
			.map((x) => x.price)
			.filter(isValue)
			.map((p) => p.centAmount);
		expect(result).toEqual([20, 30]);
	});
});

describe("unique", () => {
	it("should get unique values from array", () => {
		const result = ["john", "john", "jane"].filter(unique);
		expect(result).toEqual(["john", "jane"]);
	});
});

describe("uniqueBy", () => {
	it("should get unique objects by key", () => {
		const products = [
			{ id: "a", price: 1 },
			{ id: "a", price: 1 },
			{ id: "b", price: 1 },
		];
		const result = products.filter(uniqueBy((p) => p.id));

		expect(result).toEqual([
			{ id: "a", price: 1 },
			{ id: "b", price: 1 },
		]);
	});
});

describe("groupByMap", () => {
	it("should group objects by map", () => {
		const result = groupByMap(
			[
				{ age: 18, name: "John" },
				{ age: 18, name: "Joe" },
				{ age: 16, name: "Jack" },
			],
			(p) => p.age,
		);

		expect(result).toEqual(
			new Map([
				[16, [{ age: 16, name: "Jack" }]],
				[
					18,
					[
						{ age: 18, name: "John" },
						{ age: 18, name: "Joe" },
					],
				],
			]),
		);
	});
});

describe("groupBy", () => {
	it("should group objects", () => {
		const result = groupBy(
			[
				{ age: 18, name: "John" },
				{ age: 18, name: "Joe" },
				{ age: 16, name: "Jack" },
			],
			(p) => p.age,
		);

		expect(result).toEqual([
			[
				18,
				[
					{ age: 18, name: "John" },
					{ age: 18, name: "Joe" },
				],
			],
			[16, [{ age: 16, name: "Jack" }]],
		]);
	});
});
