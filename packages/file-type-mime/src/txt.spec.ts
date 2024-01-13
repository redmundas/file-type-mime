import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import { getString } from './bytes';
import { isText } from './txt';

describe('parse', () => {
  const files = [
    { path: './data/sample.avi', text: false },
    { path: './data/sample.mp3', text: false },
    { path: './data/sample.ogg', text: false },
    { path: './data/sample.mp4', text: false },
    { path: './data/sample.gif', text: false },
    { path: './data/sample.ico', text: false },
    { path: './data/sample.jpg', text: false },
    { path: './data/sample.png', text: false },
    { path: './data/sample.wav', text: false },
    { path: './data/sample.tiff', text: false },
    { path: './data/sample.heic', text: false },
    { path: './data/sample.pdf', text: false },
    { path: './data/sample.rtf', text: true },
    { path: './data/sample.txt', text: true },
    { path: './data/sample.json', text: true },
    { path: './data/sample.zip', text: false },
    { path: './data/sample.jar', text: false },
    { path: './data/sample.docx', text: false },
    { path: './data/sample.xlsx', text: false },
    { path: './data/sample.pptx', text: false },
    { path: './data/sample.odp', text: false },
    { path: './data/sample.ods', text: false },
    { path: './data/sample.odt', text: false },
    { path: './data/sample.epub', text: false },
    { path: './data/sample.bz2', text: false },
    { path: './data/sample.gz', text: false },
    { path: './data/sample.tar', text: false },
    { path: './data/sample.7z', text: false },
    { path: './data/sample.db', text: false },
    { path: './data/sample.woff', text: false },
    { path: './data/sample.webp', text: false },
    { path: './data/sample.psd', text: false },
    { path: './data/sample.flac', text: false },
    { path: './data/sample.wasm', text: false },
    { path: './data/sample.deb', text: false },
    { path: './data/sample.exe', text: false },
    { path: './data/sample.class', text: false },
  ];

  for (const { path, text } of files) {
    const file = path.split('/').at(-1)!;
    test(`parse file ${file}`, () => {
      const file = resolve(path);
      const buffer = readFileSync(file);
      const result = isText(getString(buffer));
      expect(result).to.eql(text);
    });
  }
});
