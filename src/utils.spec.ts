import { describe, expect, test } from 'vitest';
import { signatures } from './signatures';
import { findMatches, flatten, getUpperLimit } from './utils';

describe('utils', () => {
  test('getUpperLimit', () => {
    const value = getUpperLimit(signatures);
    expect(value).to.eql(265);
  });

  test('flatten', () => {
    const flattened = flatten(signatures);
    expect(signatures).to.be.lengthOf(29);
    expect(flattened).to.be.lengthOf(33);
  });

  test('findMatches', () => {
    expect(findMatches(signatures, {})).to.be.lengthOf(0);
    expect(findMatches(signatures, { ext: 'mp3' })).to.be.lengthOf(4);
    expect(findMatches(signatures, { mime: 'video/ogg' })).to.be.lengthOf(2);
  });
});
