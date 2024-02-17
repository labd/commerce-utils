/**
 * Sums the values of a list of objects calculated by a callback.
 *
 * @example
 * ```js
 * sum([{price: 1}, {price: 2}], x => x.price) // 3
 * ```
 */
export const sum = <T>(items: T[], getValue: (i: T) => number) =>
	items.reduce((p, c) => p + getValue(c), 0);

/**
 * Reducer callback to find object with some minimum value.
 *
 * @example
 * ```ts
 * [{price: 1}, {price: 2}].reduce(byMin(x => x.price)) // {price: 1}
 * ```
 */
export const byMin =
	<T>(byValue: (i: T) => number | undefined) =>
	(a: T, b: T) =>
		(byValue(a) ?? Infinity) < (byValue(b) ?? Infinity) ? a : b;

/**
 * Reducer callback to find object with some maximum value.
 *
 * @example
 * ```ts
 * [{price: 1}, {price: 2}].reduce(byMax(x => x.price)) // {price: 2}
 * ```
 */
export const byMax =
	<T>(byValue: (i: T) => number | undefined) =>
	(a: T, b: T) =>
		(byValue(a) ?? -Infinity) > (byValue(b) ?? -Infinity) ? a : b;

/**
 * Clamps the value between `min` and `max`.
 *
 * I.e. returns `min` if `value < min`, or `max` if value > `max`, or the value
 * itself otherwise.
 */
export const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

/**
 * Rounds a number to the nearest integer using the "half to even" strategy,
 * also known as "bankers' rounding".  This method minimizes bias in rounding
 * over a large set of numbers. When the fractional part of the number is
 * exactly 0.5, it rounds to the nearest even number.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 *
 * @example
 * // When rounding 2.5, it rounds to 2, because 2 is even
 * roundHalfEven(2.5); // Returns: 2
 *
 * @example
 * // When rounding 3.5, it rounds to 4, because 4 is even
 * roundHalfEven(3.5); // Returns: 4
 */
export const roundHalfEven = (value: number): number => {
	const fraction = value % 1;
	if (fraction > 0.5) {
		return Math.round(value);
	}
	if (fraction < 0.5) {
		return Math.floor(value);
	}
	return Math.round(value / 2) * 2;
};

/**
 * Rounds a number to the nearest integer using the "half up" strategy. This
 * method rounds up when the fractional part of the number is 0.5 or greater.
 * It's the most common form of rounding.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 *
 * @example
 * roundHalfUp(2.5); // Returns: 3
 *
 * @example
 * roundHalfUp(2.4); // Returns: 2
 */
export const roundHalfUp = (value: number): number => {
	const fraction = value % 1;
	if (fraction >= 0.5) {
		return Math.round(value);
	}
	return Math.round(value - fraction);
};

/**
 * Rounds a number to the nearest integer using the "half down" strategy. This
 * method rounds down when the fractional part of the number is exactly 0.5,
 * contrary to the "half up" method.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 *
 * @example
 * roundHalfDown(2.5); // Returns: 2
 *
 * @example
 * roundHalfDown(2.6); // Returns: 3
 */
export const roundHalfDown = (value: number): number => {
	const fraction = value % 1;
	if (fraction > 0.5) {
		return Math.round(value);
	}
	return Math.round(value - fraction);
};
