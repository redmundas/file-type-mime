import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect } from 'chai';
import parse from './parse';

describe('parse', () => {
  const files = [
    { path: './data/sample.gif', data: { ext: 'gif', mime: 'image/gif' } },
    { path: './data/sample.ico', data: { ext: 'ico', mime: 'image/x-icon' } },
    { path: './data/sample.jpg', data: { ext: 'jpg', mime: 'image/jpeg' } },
    { path: './data/sample.png', data: { ext: 'png', mime: 'image/png' } },
    {
      path: './data/sample.pdf',
      data: { ext: 'pdf', mime: 'application/pdf' },
    },
    { path: './data/sample.txt', data: undefined },
    {
      path: './data/sample.zip',
      data: { ext: 'zip', mime: 'application/zip' },
    },
    {
      path: './data/sample.docx',
      data: {
        ext: 'docx',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    },
    {
      path: './data/sample.xlsx',
      data: {
        ext: 'xlsx',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    },
    {
      path: './data/sample.pptx',
      data: {
        ext: 'pptx',
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      },
    },
    {
      path: './data/sample.odp',
      data: {
        ext: 'odp',
        mime: 'application/vnd.oasis.opendocument.presentation',
      },
    },
    {
      path: './data/sample.ods',
      data: {
        ext: 'ods',
        mime: 'application/vnd.oasis.opendocument.spreadsheet',
      },
    },
    {
      path: './data/sample.odt',
      data: {
        ext: 'odt',
        mime: 'application/vnd.oasis.opendocument.text',
      },
    },
    {
      path: './data/sample.epub',
      data: {
        ext: 'epub',
        mime: 'application/epub+zip',
      },
    },
  ];

  for (const { data, path } of files) {
    const file = path.split('/').at(-1)!;
    it(file, () => {
      const file = resolve(path);
      const buffer = readFileSync(file);
      const result = parse(buffer);
      expect(result).to.eql(data);
    });
  }
});
