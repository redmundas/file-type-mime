import { getString, getUint16, getUint32 } from './bytes';
import type { Result } from './types';

// https://en.wikipedia.org/wiki/ZIP_(file_format)#File_headers

export function parseZipLikeFiles(
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
