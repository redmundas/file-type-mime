# file-type-mime
Utility to parse mime type from a binary file

## Examples

**Browser (react)**

```javascript
import parse from 'file-type-mime';

export default function fileUpload() {
  async function onChange(e) {
    const [file] = e.target.files;
    const buffer = await file.arrayBuffer();
    const result = parse(buffer);

    console.log('MIME_TYPE', result);
  }

  return (
    <form>
      <input type="file" onChange={onChange}>
    </form>
  );
}
```

**Node.js**

```javascript
import parse from 'file-type-mime';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve('./path/to/file.pdf');
const buffer = readFileSync(file);
const result = parse(buffer);

console.log('MIME_TYPE', result);
```

## Supported file types

(more to come...)

| File extension | Content (mime) type |
| -------------- | ------------------- |
| bpm  | image/bmp |
| gif  | image/gif |
| ico  | image/x-icon |
| jpg  | image/jpeg |
| pdf  | application/pdf |
| png  | image/png |
| rar  | application/x-rar-compressed |
| zip  | application/zip |
| docx | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| pptx | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| xlsx | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
| opd  | application/vnd.oasis.opendocument.presentation |
| ods  | application/vnd.oasis.opendocument.spreadsheet |
| odt  | application/vnd.oasis.opendocument.text |
| epub | application/epub+zip |
