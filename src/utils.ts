import type { BaseSignature, Signature } from './signatures';

export function getUpperLimit(signatures: Signature[]) {
  return flatten(signatures)
    .map(([_ext, _mime, sample, { offset = 0 } = {}]) => sample.length + offset)
    .reduce((lim, val) => (val > lim ? val : lim), 0);
}

export function flatten(signatures: Signature[]): BaseSignature[] {
  return signatures.flatMap(
    ([ext, mime, bytes, options = {}, subSignatures = []]) => [
      [ext, mime, bytes, options],
      ...subSignatures,
    ],
  );
}

export function findMatches(
  signatures: Signature[],
  { ext, mime }: { ext?: string; mime?: string },
): BaseSignature[] {
  if (!(ext || mime)) return [];
  return flatten(signatures).filter(
    (signature) => signature[0] === ext || signature[1] === mime,
  );
}
