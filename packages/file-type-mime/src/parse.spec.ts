import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import parse from './parse';

describe('parse', () => {
  const files = [
    {
      path: './data/sample.avi',
      data: { ext: 'avi', mime: 'video/x-msvideo' },
    },
    { path: './data/sample.mp3', data: { ext: 'mp3', mime: 'audio/mp3' } },
    { path: './data/sample.ogg', data: { ext: 'ogg', mime: 'audio/ogg' } },
    { path: './data/sample.mp4', data: { ext: 'mp4', mime: 'video/mp4' } },
    { path: './data/sample.gif', data: { ext: 'gif', mime: 'image/gif' } },
    { path: './data/sample.ico', data: { ext: 'ico', mime: 'image/x-icon' } },
    { path: './data/sample.jpg', data: { ext: 'jpg', mime: 'image/jpeg' } },
    { path: './data/sample.png', data: { ext: 'png', mime: 'image/png' } },
    { path: './data/sample.wav', data: { ext: 'wav', mime: 'audio/wav' } },
    { path: './data/sample.tiff', data: { ext: 'tiff', mime: 'image/tiff' } },
    { path: './data/sample.heic', data: { ext: 'heic', mime: 'image/heic' } },
    {
      path: './data/sample.pdf',
      data: { ext: 'pdf', mime: 'application/pdf' },
    },
    {
      path: './data/sample.rtf',
      data: { ext: 'rtf', mime: 'application/rtf' },
    },
    { path: './data/sample.txt', data: undefined },
    { path: './data/sample.json', data: undefined },
    {
      path: './data/sample.zip',
      data: { ext: 'zip', mime: 'application/zip' },
    },
    {
      path: './data/sample.jar',
      data: { ext: 'jar', mime: 'application/java-archive' },
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
    {
      path: './data/sample.bz2',
      data: {
        ext: 'bz2',
        mime: 'application/x-bzip2',
      },
    },
    {
      path: './data/sample.gz',
      data: {
        ext: 'gz',
        mime: 'application/gzip',
      },
    },
    {
      path: './data/sample.tar',
      data: {
        ext: 'tar',
        mime: 'application/x-tar',
      },
    },
    {
      path: './data/sample.7z',
      data: {
        ext: '7z',
        mime: 'application/x-7z-compressed',
      },
    },
    {
      path: './data/sample.db',
      data: {
        ext: 'db',
        mime: 'application/vnd.sqlite3',
      },
    },
    {
      path: './data/sample.woff',
      data: {
        ext: 'woff',
        mime: 'font/woff',
      },
    },
    {
      path: './data/sample.webp',
      data: {
        ext: 'webp',
        mime: 'image/webp',
      },
    },
    {
      path: './data/sample.psd',
      data: {
        ext: 'psd',
        mime: 'image/vnd.adobe.photoshop',
      },
    },
    {
      path: './data/sample.flac',
      data: {
        ext: 'flac',
        mime: 'audio/x-flac',
      },
    },
    {
      path: './data/sample.wasm',
      data: {
        ext: 'wasm',
        mime: 'application/wasm',
      },
    },
    {
      path: './data/sample.deb',
      data: {
        ext: 'deb',
        mime: 'application/x-deb',
      },
    },
    {
      path: './data/sample.exe',
      data: {
        ext: 'exe',
        mime: 'application/x-msdownload',
      },
    },
    {
      path: './data/sample.class',
      data: {
        ext: 'class',
        mime: 'application/java-vm',
      },
    },
    {
      path: './data/sample.parquet',
      data: {
        ext: 'parquet',
        mime: 'application/vnd.apache.parquet',
      },
    },
    {
      path: './data/sample.vsix',
      data: {
        ext: 'vsix',
        mime: 'application/vsix',
      },
    },
    {
      path: './data/sample.mov',
      data: {
        ext: 'mov',
        mime: 'video/quicktime',
      },
    },
    {
      path: './data/sample.avif',
      data: {
        ext: 'avif',
        mime: 'image/avif',
      },
    },
    {
      path: './data/sample.m4v',
      data: {
        ext: 'm4v',
        mime: 'video/x-m4v',
      },
    },
    {
      path: './data/sample.m4a',
      data: {
        ext: 'm4a',
        mime: 'audio/mp4',
      },
    },
  ];

  for (const { data, path } of files) {
    const file = path.split('/').at(-1)!;
    test(`parse file ${file}`, () => {
      const file = resolve(path);
      const buffer = readFileSync(file);
      const result = parse(buffer);
      expect(result).to.eql(data);
    });
  }

  test('parse with hint option', () => {
    const result = { ext: 'pdf', mime: 'application/pdf' };
    const file = resolve('./data/sample.pdf');
    const buffer = readFileSync(file);

    expect(parse(buffer, {})).to.eql(result);
    expect(parse(buffer, { hint: {} })).to.eql(result);
    expect(parse(buffer, { hint: { ext: 'pdf' } })).to.eql(result);
    expect(parse(buffer, { hint: { ext: 'rtf' } })).to.eql(result);
    expect(parse(buffer, { hint: { mime: 'application/pdf' } })).to.eql(result);
    expect(parse(buffer, { hint: { mime: 'application/rtf' } })).to.eql(result);
    expect(
      parse(buffer, { hint: { ext: 'pdf', mime: 'application/pdf' } }),
    ).to.eql(result);
    expect(
      parse(buffer, { hint: { ext: 'pdf', mime: 'application/rtf' } }),
    ).to.eql(result);
  });

  test('parse json file with extra option', () => {
    const result = { ext: 'json', mime: 'application/json' };
    const file = resolve('./data/sample.json');
    const buffer = readFileSync(file);

    expect(parse(buffer)).to.eql(undefined);
    expect(parse(buffer, { extra: true })).to.eql(result);
  });

  test('parse text file with extra option', () => {
    const result = { ext: 'txt', mime: 'text/plain' };
    const file = resolve('./data/sample.txt');
    const buffer = readFileSync(file);

    expect(parse(buffer)).to.eql(undefined);
    expect(parse(buffer, { extra: true })).to.eql(result);
  });
});
