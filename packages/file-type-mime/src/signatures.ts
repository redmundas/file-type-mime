// https://en.wikipedia.org/wiki/List_of_file_signatures
// https://en.wikipedia.org/wiki/List_of_archive_formats

export type Options = { exact?: boolean; offset?: number };
export type BaseSignature =
  | [string, string, (number | null)[]]
  | [string, string, (number | null)[], Options];
export type Signature =
  | BaseSignature
  | [string, string, (number | null)[], Options, BaseSignature[]];

export const signatures: Signature[] = [
  [
    'db',
    'application/vnd.sqlite3',
    [
      0x53, 0x51, 0x4c, 0x69, 0x74, 0x65, 0x20, 0x66, 0x6f, 0x72, 0x6d, 0x61,
      0x74, 0x20, 0x33, 0x00,
    ],
  ],
  ['woff', 'font/woff', [0x77, 0x4f, 0x46, 0x46]],
  ['woff2', 'font/woff2', [0x77, 0x4f, 0x46, 0x32]],
  ['bmp', 'image/bmp', [0x42, 0x4d]],
  ['gif', 'image/gif', [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]],
  ['gif', 'image/gif', [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
  [
    'heic',
    'image/heic',
    [0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69],
    { offset: 4 },
  ],
  ['heic', 'image/heic', [0x66, 0x74, 0x79, 0x70, 0x6d], { offset: 4 }],
  ['ico', 'image/x-icon', [0x00, 0x00, 0x01, 0x00]],
  ['jpg', 'image/jpeg', [0xff, 0xd8, 0xff]],
  ['pdf', 'application/pdf', [0x25, 0x50, 0x44, 0x46, 0x2d]],
  ['png', 'image/png', [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  ['7z', 'application/x-7z-compressed', [0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c]],
  [
    'rar',
    'application/x-rar-compressed',
    [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x00],
  ],
  [
    'rar',
    'application/x-rar-compressed',
    [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07, 0x01, 0x00],
  ],
  ['rtf', 'application/rtf', [0x7b, 0x5c, 0x72, 0x74, 0x66, 0x31]],
  ['bz2', 'application/x-bzip2', [0x42, 0x5a, 0x68]],
  ['gz', 'application/gzip', [0x1f, 0x8b]],
  [
    'tar',
    'application/x-tar',
    [0x75, 0x73, 0x74, 0x61, 0x72, 0x00, 0x30, 0x30],
    { offset: 257 },
  ],
  [
    'tar',
    'application/x-tar',
    [0x75, 0x73, 0x74, 0x61, 0x72, 0x20, 0x20, 0x00],
    { offset: 257 },
  ],
  ['tif', 'image/tiff', [0x49, 0x49, 0x2a, 0x00]],
  ['tiff', 'image/tiff', [0x4d, 0x4d, 0x00, 0x2a]],
  ['zip', 'application/zip', [0x50, 0x4b, 0x03, 0x04], { exact: false }],
  ['zip', 'application/zip', [0x50, 0x4b, 0x05, 0x06]],
  ['mp3', 'audio/mp3', [0xff, 0xfb]],
  ['mp3', 'audio/mp3', [0xff, 0xf3]],
  ['mp3', 'audio/mp3', [0xff, 0xf2]],
  ['mp3', 'audio/mp3', [0x49, 0x44, 0x33]],
  [
    'mp4',
    'video/mp4',
    [0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d],
    { offset: 4 },
  ],
  [
    'avi',
    'video/x-msvideo',
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x41, 0x56, 0x49, 0x20],
  ],
  [
    'wav',
    'audio/wav',
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x41, 0x56, 0x45],
  ],
  [
    'ogx',
    'application/ogg',
    [0x4f, 0x67, 0x67, 0x53],
    { exact: false },
    [
      ['oga', 'audio/ogg', [0x7f, 0x46, 0x4c, 0x41, 0x43], { offset: 28 }],
      [
        'ogg',
        'audio/ogg',
        [0x01, 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73],
        { offset: 28 },
      ],
      [
        'ogm',
        'video/ogg',
        [0x01, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x00],
        { offset: 28 },
      ],
      [
        'ogv',
        'video/ogg',
        [0x80, 0x74, 0x68, 0x65, 0x6f, 0x72, 0x61],
        { offset: 28 },
      ],
    ],
  ],
  [
    'webp',
    'image/webp',
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
  ],
  ['psd', 'image/vnd.adobe.photoshop', [0x38, 0x42, 0x50, 0x53]],
  ['flac', 'audio/x-flac', [0x66, 0x4c, 0x61, 0x43]],
  ['wasm', 'application/wasm', [0x00, 0x61, 0x73, 0x6d]],
  [
    'deb',
    'application/x-deb',
    [0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e, 0x0a],
  ],
  ['exe', 'application/x-msdownload', [0x4d, 0x5a]],
  ['exe', 'application/x-msdownload', [0x5a, 0x4d]],
  ['class', 'application/java-vm', [0xca, 0xfe, 0xba, 0xbe]],
];