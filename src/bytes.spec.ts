import { expect } from 'chai';
import {
  bytesToHex,
  compareBytes,
  getString,
  getUint16,
  getUint32,
} from './bytes';

describe('bytes', () => {
  const intValue = 128;
  const strValue = '.';

  it('compareBytes', () => {
    const array = new Uint8Array([intValue, intValue]);
    expect(compareBytes(array, [intValue, intValue])).to.be.true;
    expect(compareBytes(array, [intValue], 1)).to.be.true;
  });

  it('getString', () => {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(strValue).buffer;
    expect(getString(buffer)).to.eq(strValue);
  });

  it('getUint16', () => {
    const buffer = new Uint16Array([intValue]).buffer;
    expect(getUint16(buffer, 0)).to.eq(intValue);
  });

  it('getUint32', () => {
    const buffer = new Uint32Array([intValue]).buffer;
    expect(getUint32(buffer, 0)).to.eq(intValue);
  });

  it('toHex', () => {
    const array = new Uint8Array([intValue, intValue]);
    expect(bytesToHex(array)).to.eq('80 80');
  });
});
