'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { slugify } = require('../src/slugify.js');

test('lowercases and joins words with a hyphen', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('strips punctuation and surrounding whitespace', () => {
  assert.equal(slugify('  Olá, Mundo!  '), 'ola-mundo');
});

test('collapses runs of separators into one hyphen', () => {
  assert.equal(slugify('a---b'), 'a-b');
});

test('removes leading and trailing hyphens', () => {
  assert.equal(slugify('--already--slugged--'), 'already-slugged');
});

test('normalises accents without dropping the letter', () => {
  assert.equal(slugify('Configuração'), 'configuracao');
  assert.equal(slugify('Ünïcödé'), 'unicode');
});

test('returns an empty string for empty input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('   '), '');
});

test('throws TypeError on non-string input', () => {
  assert.throws(() => slugify(42), TypeError);
  assert.throws(() => slugify(null), TypeError);
  assert.throws(() => slugify(undefined), TypeError);
});
