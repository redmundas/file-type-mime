export default function parse(buffer: ArrayBuffer) {
  // Size needs to be not less than the longest sample + offset
  const bytes = new Uint8Array(buffer.slice(0, 8));
  for (const [ext, mime, sample, offset = 0] of headers) {
    if (compare(bytes, sample, offset)) {
      return { ext, mime };
    }
  }

  return undefined;
}

// https://en.wikipedia.org/wiki/List_of_file_signatures
const headers: Array<[string, string, number[]]> = [
  ['bmp', 'image/bmp', [0x42, 0x4d]],
  ['gif', 'image/gif', [0x47, 0x49, 0x46]],
  ['jpg', 'image/jpeg', [0xff, 0xd8, 0xff]],
  ['pdf', 'application/pdf', [0x25, 0x50, 0x44, 0x46, 0x2d]],
  ['png', 'image/png', [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
];

function compare(source: Uint8Array, sample: number[], offset: number) {
  if (source.length < sample.length + offset) {
    return false;
  }

  for (const [i, element] of sample.entries()) {
    if (element !== source[i + offset]) {
      return false;
    }
  }

  return true;
}
