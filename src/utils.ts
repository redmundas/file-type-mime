export function getUint16(buffer: ArrayBuffer, offset: number) {
  const view = getBufferView(buffer, offset, 2);
  return view.getUint16(0, true);
}

export function getUint32(buffer: ArrayBuffer, offset: number) {
  const view = getBufferView(buffer, offset, 4);
  return view.getUint32(0, true);
}

export function getString(buffer: ArrayBuffer, offset: number, length: number) {
  const slice = buffer.slice(offset, offset + length);
  return decoder.decode(new Uint8Array(slice));
}

function getBufferView(buffer: ArrayBuffer, offset: number, length: number) {
  const slice = buffer.slice(offset, offset + length);
  return new DataView(new Uint8Array(slice).buffer);
}

const decoder = new TextDecoder('utf8');
