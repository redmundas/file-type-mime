import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from './packages/file-type-mime/dist/index.mjs';

const file = resolve('./packages/file-type-mime/data/sample.deb');
const buffer = readFileSync(file);
const result = parse(buffer);

console.log('MIME_TYPE', result);
