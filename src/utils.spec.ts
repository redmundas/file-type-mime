import { expect } from 'chai';
import { getString, getUint16, getUint32 } from './utils';

describe('utils', () => {
  const intValue = 128;
  const strValue = '.';

  it('getUint16', () => {
    const buffer = new Uint16Array([intValue]).buffer;
    expect(getUint16(buffer, 0)).to.eq(intValue);
  });

  it('getUint32', () => {
    const buffer = new Uint32Array([intValue]).buffer;
    expect(getUint32(buffer, 0)).to.eq(intValue);
  });

  it('getString', () => {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(strValue).buffer;
    expect(getString(buffer)).to.eq(strValue);
  });
});
