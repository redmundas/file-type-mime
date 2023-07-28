import { expect } from 'chai';
import { signatures } from './signatures';
import { findMatches, flatten, getUpperLimit } from './utils';

describe('utils', () => {
  it('getUpperLimit', () => {
    const value = getUpperLimit(signatures);
    expect(value).to.eql(265);
  });

  it('flatten', () => {
    const flattened = flatten(signatures);
    expect(signatures).to.be.lengthOf(29);
    expect(flattened).to.be.lengthOf(33);
  });

  it('findMatches', () => {
    expect(findMatches(signatures, {})).to.be.lengthOf(0);
    expect(findMatches(signatures, { ext: 'mp3' })).to.be.lengthOf(4);
    expect(findMatches(signatures, { mime: 'video/ogg' })).to.be.lengthOf(2);
  });
});
