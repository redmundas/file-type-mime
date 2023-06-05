import { signatures } from './signatures';
import { compareBytes, getString, getUint16, getUint32 } from './utils';

// Upper limit needs to be not less than the longest sample + offset
const UPPER_LIMIT = signatures
  .map(([_ext, _mime, sample, { offset = 0 } = {}]) => sample.length + offset)
  .reduce((lim, val) => (val > lim ? val : lim), 0);

export default function parse(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer.slice(0, UPPER_LIMIT));
  for (const [
    ext,
    mime,
    sample,
    { empty = false, offset = 0 } = {},
  ] of signatures) {
    if (compareBytes(bytes, sample, offset)) {
      if (ext === 'zip' && !empty) {
        return parseZipLikeFiles(buffer, { ext, mime });
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
) {
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

function parseOpenDocumentFile(buffer: ArrayBuffer, offset: number) {
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
}
