import test from 'node:test';
import assert from 'node:assert/strict';
import {
  scaleIngredient,
  formatIngredientAmount,
  convertUnit,
  estimateReadingTime,
  filterContent,
} from './recipeCalculator.ts';

test('scaleIngredient scales quantities accurately based on servings ratio', () => {
  // 4 servings to 6 servings = 1.5x
  assert.equal(scaleIngredient(2, 4, 6), 3);
  assert.equal(scaleIngredient(1, 4, 2), 0.5);
  assert.equal(scaleIngredient(0.5, 4, 8), 1);
  // Zero or invalid inputs return original
  assert.equal(scaleIngredient(2, 0, 4), 2);
});

test('formatIngredientAmount formats clean cooking fractions', () => {
  assert.equal(formatIngredientAmount(0.5), '1/2');
  assert.equal(formatIngredientAmount(0.25), '1/4');
  assert.equal(formatIngredientAmount(0.75), '3/4');
  assert.equal(formatIngredientAmount(1.5), '1 1/2');
  assert.equal(formatIngredientAmount(2), '2');
  assert.equal(formatIngredientAmount(0), '');
});

test('convertUnit converts between Imperial and Metric measurements', () => {
  // 1 lb -> 454g
  const metricWeight = convertUnit(1, 'lb', 'metric');
  assert.equal(metricWeight.unit, 'g');
  assert.equal(metricWeight.amount, 454);

  // 1 cup -> 240ml
  const metricVolume = convertUnit(1, 'cup', 'metric');
  assert.equal(metricVolume.unit, 'ml');
  assert.equal(metricVolume.amount, 240);

  // 500g -> 1.1 lbs
  const imperialWeight = convertUnit(500, 'g', 'imperial');
  assert.equal(imperialWeight.unit, 'lbs');
  assert.equal(imperialWeight.amount, 1.1);
});

test('estimateReadingTime estimates reading minutes from word count', () => {
  // 400 words at 200 wpm = 2 mins
  const text400 = new Array(400).fill('delicious').join(' ');
  assert.equal(estimateReadingTime(text400), 2);

  // Short text defaults to at least 1 min
  assert.equal(estimateReadingTime('Quick bite'), 1);
});

test('filterContent correctly filters by category, subcategory and keyword', () => {
  const items = [
    { title: 'Pakistani Chicken Karahi', category: 'Desi Food', subcategory: 'Pakistani Food' },
    { title: 'Italian Margherita Pizza', category: 'Western Food', subcategory: 'Italian Food' },
    { title: 'Classic American Cheeseburger', category: 'Western Food', subcategory: 'American Food' },
  ];

  const desiOnly = filterContent(items, '', 'Desi Food');
  assert.equal(desiOnly.length, 1);
  assert.equal(desiOnly[0].title, 'Pakistani Chicken Karahi');

  const burgerSearch = filterContent(items, 'burger');
  assert.equal(burgerSearch.length, 1);
  assert.equal(burgerSearch[0].title, 'Classic American Cheeseburger');
});
