export default function parse(buffer: ArrayBuffer) {
  // size needs to be not less than the longest sample + offset
  const bytes = new Uint8Array(buffer.slice(0, 8));
  for (const [ext, mime, sample, offset = 0] of headers) {
    if (compare(bytes, sample, offset)) {
      return { ext, mime };
    }
  }
  return undefined;
}

// https://en.wikipedia.org/wiki/List_of_file_signatures
const headers: [string, string, number[]][] = [
  ['bmp', 'image/bmp', [0x42, 0x4D]],
  ['gif', 'image/gif', [0x47, 0x49, 0x46]],
  ['jpg', 'image/jpeg', [0xFF, 0xD8, 0xFF]],
  ['pdf', 'application/pdf', [0x25, 0x50, 0x44, 0x46, 0x2D]],
  ['png', 'image/png', [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
];

function compare(source: Uint8Array, sample: number[], offset: number) {
  if (source.length < sample.length + offset) {
    return false;
  }
  for (let i = 0; i < sample.length; i++) {
    if (sample[i] !== source[i + offset]) {
			return false;
		}
  }
  return true;
}
