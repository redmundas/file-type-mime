import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect } from 'chai';
import parse from './parse';

describe('parse', () => {
  const files = [
    { path: './data/sample.png', data: { ext: 'png', mime: 'image/png' } },
    {
      path: './data/sample.pdf',
      data: { ext: 'pdf', mime: 'application/pdf' },
    },
    { path: './data/sample.txt', data: undefined },
  ];

  for (const { data, path } of files) {
    it(`${path} file`, () => {
      const file = resolve(path);
      const buffer = readFileSync(file);
      const result = parse(buffer);
      expect(result).to.eql(data);
    });
  }
});
