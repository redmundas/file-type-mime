// https://en.wikipedia.org/wiki/List_of_file_signatures

type Options = { empty?: boolean; offset?: number };
type Signature =
  | [string, string, number[]]
  | [string, string, number[], Options];

const types: Signature[] = [
  ['bmp', 'image/bmp', [0x42, 0x4d]],
  ['gif', 'image/gif', [0x47, 0x49, 0x46]],
  ['ico', 'image/x-icon', [0x00, 0x00, 0x01, 0x00]],
  ['jpg', 'image/jpeg', [0xff, 0xd8, 0xff]],
  ['pdf', 'application/pdf', [0x25, 0x50, 0x44, 0x46, 0x2d]],
  ['png', 'image/png', [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  ['zip', 'application/zip', [0x50, 0x4b, 0x03, 0x04]],
  ['zip', 'application/zip', [0x50, 0x4b, 0x05, 0x06], { empty: true }],
];

export default types;
