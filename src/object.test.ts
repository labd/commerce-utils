import { describe, expect, it } from "vitest";
import { pruneObject } from "./object";

describe("pruneObject", () => {
	it("should prune empty properties", () => {
		const result = pruneObject({
			a: 1,
			b: undefined,
		});

		expect(result).toEqual({ a: 1 });
	});
});
