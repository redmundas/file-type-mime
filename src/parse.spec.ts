import chai, { expect } from 'chai';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import parse from './parse';

describe('parse', function () {
  const files = [
    { path: './data/sample.png', data: { ext: 'png', mime: 'image/png' }},
    { path: './data/sample.pdf', data: { ext: 'pdf', mime: 'application/pdf' }},
    { path: './data/sample.txt', data: undefined },
  ];
  files.forEach(({ data, path}) => {
    it(`${path} file`, function () {
      const file = resolve(path);
      const buffer = readFileSync(file);
      const result = parse(buffer);
      expect(result).to.eql(data);
    });
  });
});
