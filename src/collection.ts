/**
 * Utility for lists to ensure there are no empty values.
 *
 * @example
 * ```ts
 * const products = [
 * {id: 'a', price: {centAmount: 20}},
 * {id: 'b', price: null},
 * {id: 'c', price: {centAmount: 30}}
 * ]
 * products.map(x => x.price).filter(isValue).map(p => p.centAmount)
 *
 * // results in
 * [20, 30]
 * ```
 */
export const isValue = <T>(value: T): value is NonNullable<T> =>
	value !== null && value !== undefined;

/**
 * Filter utility to filter out duplicate values
 *
 * @example
 * ```ts
 * const names = ['john', 'john', 'jane'].filter(unique) // ['john', 'jane']
 * ```
 */
export const unique = <T>(v: T, i: number, s: T[]) =>
	s.findIndex((e) => e === v) === i;

/*
 * Utility to filter out double items in an array by some measure.
 *
 * @example
 * ```ts
 * const products = [
 * {id: 'a', price: 1},
 * {id: 'a', price: 1},
 * {id: 'b', price: 1}
 * ]
 * products.filter(uniqueBy(p => p.id))
 *
 * // results in
 * [{id: 'a', price: 1}, {id: 'b', price: 1}]
 * ```
 */
export const uniqueBy =
	<T, S>(getValue: (item: T) => S) =>
	(v: T, i: number, s: T[]) =>
		s.findIndex((e) => getValue(e) === getValue(v)) === i;

/**
 * Groups a list based on a callback.
 * Returns a Map where the keys are the result of the callback.
 *
 * @example
 * ```ts
 * groupByMap(
 *   [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}, {age: 16, name: 'Jack'}],
 *   p => p.age,
 * )
 *
 * // results in
 * Map {
 *  16: [{age: 16, name: 'Jack'}],
 *  18: [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}],
 * }
 * ```
 */
export const groupByMap = <T, S>(list: T[], keyGetter: (i: T) => S) => {
	const map = new Map<S, T[]>();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
};

/**
 * Groups a list based on a callback.
 * Returns a Map where the keys are the result of the callback.
 *
 * @example
 * ```ts
 * groupBy(
 *   [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}, {age: 16, name: 'Jack'}],
 *   p => p.age,
 * )
 *
 * // results in
 * [
 *  [16, [{age: 16, name: 'Jack'}]],
 *  [18, [{age: 18, name: 'John'}, {age: 18, name: 'Joe'}]],
 * ]
 * ```
 */
export const groupBy = <T, S>(list: T[], keyGetter: (i: T) => S) => [
	...groupByMap(list, keyGetter).entries(),
];

/**
 * Finds the first item in a list of items by a list of ids.
 *
 * @example
 * ```ts
 * const products = [
 * {id: 'a', price: 1},
 * {id: 'b', price: 1},
 * {id: 'c', price: 1}
 * ]
 * findFirst(['x', 'b'], products, p => p.id) // {id: 'b', price: 1}
 */
export const findFirst = <T>(
	ids: string[],
	items: T[],
	getId: (item: T) => string,
) => {
	for (const id of ids) {
		const item = items.find((p) => p && getId(p) === id);

		if (item) {
			return item;
		}
	}
};

/**
 * Creates a range of numbers, staring at `start` and ending at `end` .
 *
 * @example
 * ```ts
 * range({start: 0, end: 3}) // [0, 1, 2]
 * range({start: 1, end: 3}) // [1, 2]
 * ```
 */
export const range = ({ start = 0, end }: { start: number; end: number }) =>
	Array.from({ length: end - start }, (_, i) => start + i);

/**
 * Merges two arrays, creating a single array with tuples from both arrays.
 *
 * @example
 * ```ts
 * const a = [1,2,3]
 * const b = ['a', 'b', 'c']
 *
 * zip(a, b) // [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 */
export const zip = <T>(a: T[], b: T[]) => a.map((k, i) => [k, b[i]] as const);
