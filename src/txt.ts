import { getString } from './bytes';

export function isText(data: string) {
  for (let i = 0; i < data.length; i++) {
    try {
      const code = data.charCodeAt(i);
      // 65533 is the unknown char
      // 8 and below are control chars
      if (code === 65533 || code <= 8) {
        return false;
      }
    } catch {
      return false;
    }
  }

  return true;
}

export function parseTxtLikeFiles(buffer: ArrayBuffer) {
  try {
    const data = getString(buffer);
    if (!isText(data)) {
      return undefined;
    }
    try {
      JSON.parse(data);
      return { ext: 'json', mime: 'application/json' };
    } catch {
      return { ext: 'txt', mime: 'text/plain' };
    }
  } catch {
    return undefined;
  }
}
