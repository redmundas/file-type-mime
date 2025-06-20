export function getUint16(buffer: ArrayBuffer, offset = 0) {
  const view = getBufferView(buffer, offset, 2);
  return view.getUint16(0, true);
}

export function getUint32(buffer: ArrayBuffer, offset = 0) {
  const view = getBufferView(buffer, offset, 4);
  return view.getUint32(0, true);
}

export function getString(
  buffer: ArrayBuffer,
  offset = 0,
  length = buffer.byteLength,
) {
  const slice = buffer.slice(offset, offset + length);
  return decoder.decode(new Uint8Array(slice));
}

export function bytesToHex(array: Uint8Array, separator = ' ') {
  const parts = [...array].map((x) => x.toString(16).padStart(2, '0'));
  return parts.join(separator);
}

export function stringToBytes(value: string) {
  return encoder.encode(value);
}

export function compareString(array: Uint8Array, value: string, offset = 0) {
  const bytes = stringToBytes(value);
  return compareBytes(array, bytes, offset);
}

export function containsString(buffer: ArrayBuffer, value: string, offset = 0) {
  return compareString(
    new Uint8Array(buffer.slice(offset, value.length * 8)),
    value,
  );
}

export function compareBytes(
  source: Uint8Array | number[],
  sample: Uint8Array | (number | null)[],
  offset = 0,
) {
  if (source.length < sample.length + offset) {
    return false;
  }

  for (const [i, element] of sample.entries()) {
    if (element === null) continue;
    if (element !== source[i + offset]) {
      return false;
    }
  }

  return true;
}

function getBufferView(buffer: ArrayBuffer, offset: number, length: number) {
  const slice = buffer.slice(offset, offset + length);
  return new DataView(new Uint8Array(slice).buffer);
}

const decoder = new TextDecoder('utf8');
const encoder = new TextEncoder();
