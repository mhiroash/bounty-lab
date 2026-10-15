'use strict';

/**
 * Convert arbitrary text into a URL-safe slug.
 *
 * Rules (see issue #1):
 *  - Output is lowercase.
 *  - Runs of non-alphanumeric characters collapse to a single hyphen.
 *  - Leading/trailing hyphens are stripped.
 *  - Accented characters are normalised to their ASCII base (ção -> cao).
 *  - Empty or whitespace-only strings yield an empty string.
 *  - Non-string input throws a TypeError.
 *
 * @param {string} input
 * @returns {string}
 */
function slugify(input) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify expects a string');
  }

  const normalised = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return normalised
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = { slugify };
