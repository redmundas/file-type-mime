import { compareBytes, containsString } from './bytes';
import { parseFileTypeBoxFiles } from './ftyp';
import { type Signature, signatures as samples } from './signatures';
import { parseTxtLikeFiles } from './txt';
import type { Options, Result } from './types';
import { findMatches, getUpperLimit } from './utils';
import { parseZipLikeFiles } from './zip';

// Upper limit needs to be not less than the longest sample + offset
const UPPER_LIMIT = getUpperLimit(samples);

export default function parse(
  buffer: ArrayBuffer,
  { extra = false, hint }: Options = {},
): Result | undefined {
  // use the hint to short-circuit the parsing
  // in case it's incorect - continue main flow
  if (hint) {
    const matches = findMatches(samples, hint);
    if (matches.length > 0) {
      const result = parseBytes(buffer, matches);
      if (result !== undefined) {
        return result;
      }
    }
  }

  if (containsString(buffer, 'ftyp', 4)) {
    return parseFileTypeBoxFiles(buffer);
  }

  const result = parseBytes(buffer, samples);

  if (result) {
    return result;
  }

  if (extra) {
    return parseExtraTypes(buffer);
  }

  return undefined;
}

function parseBytes(
  buffer: ArrayBuffer,
  signatures: Signature[],
): Result | undefined {
  const bytes = new Uint8Array(buffer.slice(0, UPPER_LIMIT));
  for (const [
    ext,
    mime,
    sample,
    { exact = true, offset = 0 } = {},
    subSignatures = [],
  ] of signatures) {
    if (compareBytes(bytes, sample, offset)) {
      if (ext === 'zip' && !exact) {
        // pass full buffer to zip parser
        return parseZipLikeFiles(buffer, { ext, mime });
      }

      if (!exact && subSignatures.length) {
        for (const [ext, mime, sample, { offset = 0 } = {}] of subSignatures) {
          if (compareBytes(bytes, sample, offset)) {
            return { ext, mime };
          }
        }
      }

      return { ext, mime };
    }
  }

  return undefined;
}

function parseExtraTypes(buffer: ArrayBuffer): Result | undefined {
  return parseTxtLikeFiles(buffer);
}
