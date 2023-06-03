# file-type-mime
Utility to parse mime type from a binary file

## Examples

**Browser**

```javascript
import parse from 'file-type-mime';

function fileUpload() {
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
