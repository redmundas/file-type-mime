import { expect } from 'chai';
import { signatures } from './signatures';
import { getUpperLimit } from './utils';

describe('utils', () => {
  it('getUpperLimit', () => {
    const value = getUpperLimit(signatures);
    expect(value).to.eql(265);
  });
});
