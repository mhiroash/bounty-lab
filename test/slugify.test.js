'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { slugify } = require('../src/slugify');

test('slugify basico', () => {
  assert.strictEqual(slugify('Olá Mundo'), 'ola-mundo');
});
test('slugify com acentos e simbolos', () => {
  assert.strictEqual(slugify('  DevSecOps é Fixe!  '), 'devsecops-e-fixe');
});
test('slugify vazio', () => {
  assert.strictEqual(slugify(''), '');
});
