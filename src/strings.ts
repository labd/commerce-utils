/**
 * Compares two strings for equality, ignoring case sensitivity.
 *
 * @param {string} value - The first string to compare.
 * @param {string} other - The second string to compare.
 * @returns {boolean} Returns `true` if the strings are equal ignoring case, otherwise `false`.
 */
export const equalsIgnoringCase = (value: string, other: string): boolean =>
	value.toLowerCase() === other.toLowerCase();
