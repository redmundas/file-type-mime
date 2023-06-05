import type { Signature } from './signatures';

export function getUpperLimit(signatures: Signature[]) {
  return signatures
    .map(([_ext, _mime, sample, { offset = 0 } = {}]) => sample.length + offset)
    .reduce((lim, val) => (val > lim ? val : lim), 0);
}
