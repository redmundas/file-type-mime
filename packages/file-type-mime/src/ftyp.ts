import { containsString } from './bytes';
import type { Result } from './types';

// https://en.wikipedia.org/wiki/Container_format
// https://en.wikipedia.org/wiki/ISO_base_media_file_format

export function parseFileTypeBoxFiles(buffer: ArrayBuffer): Result | undefined {
  const is = (value: string) => containsString(buffer, value, 8);
  if (is('qt')) {
    return { ext: 'mov', mime: 'video/quicktime' };
  }
  if (is('heic')) {
    return { ext: 'heic', mime: 'image/heic' };
  }
  if (is('avif')) {
    return { ext: 'avif', mime: 'image/avif' };
  }
  if (is('M4V')) {
    return { ext: 'm4v', mime: 'video/x-m4v' };
  }
  // if (is('M4P')) {
  //   return { ext: 'm4p', mime: 'video/mp4' };
  // }
  return { ext: 'mp4', mime: 'video/mp4' };
}
