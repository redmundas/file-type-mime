import { compareBytes, getString, getUint16, getUint32 } from './bytes';
import { Signature, signatures as samples } from './signatures';
import type { Options, Result } from './types';
import { findMatches, getUpperLimit } from './utils';

// Upper limit needs to be not less than the longest sample + offset
const UPPER_LIMIT = getUpperLimit(samples);

export default function parse(
  buffer: ArrayBuffer,
  { extra = false, hint }: Options = {},
): Result | undefined {
  const bytes = new Uint8Array(buffer.slice(0, UPPER_LIMIT));

  // use the hint to short-circuit the parsing
  // in case it's incorect - continue main flow
  if (hint) {
    const matches = findMatches(samples, hint);
    if (matches.length > 0) {
      const result = parseBytes(bytes, matches);
      if (result !== undefined) {
        return result;
      }
    }
  }

  const result = parseBytes(bytes, samples);

  if (result) {
    return result;
  }

  if (extra) {
    return parseExtraTypes(buffer);
  }

  return undefined;
}

function parseBytes(
  bytes: Uint8Array,
  signatures: Signature[],
): Result | undefined {
  for (const [
    ext,
    mime,
    sample,
    { exact = true, offset = 0 } = {},
    subSignatures = [],
  ] of signatures) {
    if (compareBytes(bytes, sample, offset)) {
      if (ext === 'zip' && !exact) {
        return parseZipLikeFiles(bytes.buffer, { ext, mime });
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

// https://en.wikipedia.org/wiki/ZIP_(file_format)#File_headers
function parseZipLikeFiles(
  buffer: ArrayBuffer,
  result: { ext: string; mime: string },
): Result | undefined {
  const size = getUint16(buffer, 26);
  const name = getString(buffer, 30, size);
  const [identifier] = name.split('/');
  const xmlFormat = name.endsWith('.xml');

  if (identifier === 'META-INF') {
    return {
      ext: 'jar',
      mime: 'application/java-archive',
    };
  }

  if (identifier === 'ppt' && xmlFormat) {
    return {
      ext: 'pptx',
      mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };
  }

  if (identifier === 'word' && xmlFormat) {
    return {
      ext: 'docx',
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
  }

  if (identifier === 'xl' && xmlFormat) {
    return {
      ext: 'xlsx',
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
  }

  if (identifier === 'mimetype') {
    return parseOpenDocumentFile(buffer, size) ?? result;
  }

  return result;
}

function parseOpenDocumentFile(
  buffer: ArrayBuffer,
  offset: number,
): Result | undefined {
  const compressedSize = getUint32(buffer, 18);
  const uncompressedSize = getUint32(buffer, 22);
  const extraFieldLength = getUint16(buffer, 28);

  if (compressedSize === uncompressedSize) {
    const mime = getString(
      buffer,
      30 + offset + extraFieldLength,
      compressedSize,
    );

    if (mime === 'application/vnd.oasis.opendocument.presentation') {
      return {
        ext: 'odp',
        mime,
      };
    }

    if (mime === 'application/vnd.oasis.opendocument.spreadsheet') {
      return {
        ext: 'ods',
        mime,
      };
    }

    if (mime === 'application/vnd.oasis.opendocument.text') {
      return {
        ext: 'odt',
        mime,
      };
    }

    if (mime === 'application/epub+zip') {
      return {
        ext: 'epub',
        mime,
      };
    }
  }

  return undefined;
}

function parseExtraTypes(buffer: ArrayBuffer): Result | undefined {
  try {
    const data = getString(buffer);
    JSON.parse(data);
    return { ext: 'json', mime: 'application/json' };
  } catch {
    return undefined;
  }
}
