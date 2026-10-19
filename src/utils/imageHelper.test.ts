import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveImageUrl } from './imageHelper.ts';

test('resolveImageUrl passes through external http/https and data URIs', () => {
  assert.equal(
    resolveImageUrl('https://example.com/image.jpg'),
    'https://example.com/image.jpg'
  );
  assert.equal(
    resolveImageUrl('http://example.com/image.jpg'),
    'http://example.com/image.jpg'
  );
  assert.equal(
    resolveImageUrl('data:image/svg+xml,...'),
    'data:image/svg+xml,...'
  );
});

test('resolveImageUrl normalizes public image paths', () => {
  assert.equal(
    resolveImageUrl('/images/pakistani-chicken-karahi.jpg'),
    '/images/pakistani-chicken-karahi.jpg'
  );
  assert.equal(
    resolveImageUrl('images/royal-chicken-biryani.jpg'),
    '/images/royal-chicken-biryani.jpg'
  );
});

test('resolveImageUrl maps legacy dev asset paths to clean public image paths', () => {
  assert.equal(
    resolveImageUrl('/src/assets/images/chicken_karahi_1792407742450.jpg'),
    '/images/pakistani-chicken-karahi.jpg'
  );
  assert.equal(
    resolveImageUrl('/src/assets/images/margherita_pizza_1792407744383.jpg'),
    '/images/italian-margherita-pizza.jpg'
  );
  assert.equal(
    resolveImageUrl('/src/assets/images/american_cheeseburger_1792407744496.jpg'),
    '/images/american-cheeseburger.jpg'
  );
});

test('resolveImageUrl handles undefined or empty inputs gracefully', () => {
  assert.equal(resolveImageUrl(undefined), '');
  assert.equal(resolveImageUrl(''), '');
});
