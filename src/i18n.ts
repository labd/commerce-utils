import { equalsIgnoringCase } from "./strings";

/**
 * Attempts to find a matching value for the provided locale by trying the given
 * locale and its language tag, followed by locale without subtags and then by
 * any additional fallback locales specified.
 *
 * It performs both an exact case-sensitive match and a case-insensitive match
 * to ensure compatibility with different case conventions. Notably, if a
 * specific locale (e.g., 'en-GB') does not have a direct match, the function
 * will try to fall back to a more general locale (e.g., 'en') before moving on
 * to the next fallback locales.
 *
 * @example
 * // Define a map of localized values
 * const greetings = {
 *   'en': 'Hello',
 *   'en-US': 'Howdy',
 *   'fr': 'Bonjour'
 * };
 *
 * // Get localized value for British English without an explicit entry, falling
 * // back to generic English
 * getLocalizedValue(greetings, 'en-GB');
 *
 * @example
 * // Get localized value for American English specifically
 * getLocalizedValue(greetings, 'en-US');
 *
 * @example
 * // Attempt to get a localized value for an unsupported locale with fallbacks
 * getLocalizedValue(greetings, 'es', 'en');
 */
export const getLocalizedValue = <T = string>(
	values: {
		[key: string]: T;
	},
	locale: string,
	fallbackLocales: string[] = [],
): T | undefined => {
	// Fast case-sensitive lookup
	if (locale in values) {
		return values[locale];
	}

	const { languageTag, subTag } = parseLocale(locale);
	const fallback = subTag
		? [locale, languageTag, ...fallbackLocales]
		: [locale, ...fallbackLocales];

	for (const altLocale of fallback) {
		const lowerLocale = altLocale.toLowerCase();
		for (const key in values) {
			if (key.toLowerCase() === lowerLocale) {
				return values[key];
			}
		}
	}

	return undefined;
};

/**
 * Parses a locale string and extracts the primary language tag and an optional
 * subtag.  According to the IETF language tag standard (see
 * https://en.wikipedia.org/wiki/IETF_language_tag), a locale can consist of a
 * primary language tag followed by optional subtags, separated by hyphens. This
 * function specifically extracts the primary language tag and the first subtag
 * if present. Subsequent subtags are not considered in the current
 * implementation.
 *
 * @param {string} locale - The locale string to parse. Expected format:
 * 'language[-subtag]', where 'language' is a 2 or 3 letter language code, and
 * 'subtag' is an optional additional identifier, such as a country code or
 * script.
 *
 * @returns {{ languageTag: string; subTag: string | undefined }} An object
 * containing the primary language tag and, if present, the first subtag. The
 * 'subTag' field is `undefined` if the locale does not include a subtag.
 *
 * @example
 * // Parsing a simple language tag
 * parseLocale('en');
 * // Returns: { languageTag: 'en', subTag: undefined }
 *
 * @example
 * // Parsing a locale with a subtag
 * parseLocale('en-US');
 * // Returns: { languageTag: 'en', subTag: 'US' }
 *
 * @example
 * // Parsing a locale with multiple subtags, note that subsequent subtags are ignored
 * parseLocale('zh-Hant-HK');
 * // Returns: { languageTag: 'zh', subTag: 'Hant' }
 */

export const parseLocale = (
	locale: string,
): { languageTag: string; subTag: string | undefined } => {
	const [languageTag, subTag] = locale.split("-");
	return { languageTag, subTag };
};

