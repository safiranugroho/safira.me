import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeFrontmatter } from './normalize-frontmatter.ts';

test('converts a string date into a Date', () => {
  const { date } = normalizeFrontmatter({ title: 'Post', date: '2020-10-17' });
  assert.ok(date instanceof Date);
  assert.equal(date.toISOString(), '2020-10-17T00:00:00.000Z');
});

test('keeps an existing Date value', () => {
  const original = new Date('2021-10-18T00:00:00.000Z');
  const { date } = normalizeFrontmatter({ title: 'Post', date: original });
  assert.equal(date.getTime(), original.getTime());
});

test('preserves the other frontmatter fields', () => {
  const result = normalizeFrontmatter({ title: 'Post', description: 'Desc', date: '2026-10-12' });
  assert.equal(result.title, 'Post');
  assert.equal(result.description, 'Desc');
});
