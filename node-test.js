import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from './dist/index.mjs';

const file = resolve('./data/sample.deb');
const buffer = readFileSync(file);
const result = parse(buffer);

console.log('MIME_TYPE', result);
