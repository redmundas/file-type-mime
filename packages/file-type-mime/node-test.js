import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "file-type-mime";

const file = resolve("./data/sample.pdf");
const buffer = readFileSync(file);
const result = parse(buffer);

console.log("MIME_TYPE", result);
