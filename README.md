# file-type-mime
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fredmundas%2Ffile-type-mime.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fredmundas%2Ffile-type-mime?ref=badge_shield)

Utility to parse mime type from a file content.

## Usage

**Browser (react)**

```javascript
import { parse } from 'file-type-mime';

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
import { parse } from 'file-type-mime';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve('./path/to/file.pdf');
const buffer = readFileSync(file);
const result = parse(buffer);

console.log('MIME_TYPE', result);
```

## API

### Signature

`function parse(buffer: ArrayBuffer, options: Options = {}): Result | undefined`

### Arguments

#### buffer

Type: `ArrayBuffer`

A buffer representing file data

#### options (optional)

Type: `{ extra?: boolean; hint?: { ext?: string; mime?: string } }`

- hint - used to short-circuit general flow by filtering signatures list
- extra - used to parse additional file type formats (like json)

### Return

Type: `{ ext: string; mime: string } | undefined`

## Supported file types

(more to come...)

| File extension | Content (mime) type                                                       |
| -------------- | ------------------------------------------------------------------------- |
| bmp            | image/bmp                                                                 |
| gif            | image/gif                                                                 |
| ico            | image/x-icon                                                              |
| jpg            | image/jpeg                                                                |
| heic           | image/heic                                                                |
| png            | image/png                                                                 |
| tiff           | image/tiff                                                                |
| pdf            | application/pdf                                                           |
| rtf            | application/rtf                                                           |
| epub           | application/epub+zip                                                      |
| gz             | application/gzip                                                          |
| jar            | application/java-archive                                                  |
| zip            | application/zip                                                           |
| bz2            | application/x-bzip2                                                       |
| rar            | application/x-rar-compressed                                              |
| tar            | application/x-tar                                                         |
| docx           | application/vnd.openxmlformats-officedocument.wordprocessingml.document   |
| pptx           | application/vnd.openxmlformats-officedocument.presentationml.presentation |
| xlsx           | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet         |
| opd            | application/vnd.oasis.opendocument.presentation                           |
| ods            | application/vnd.oasis.opendocument.spreadsheet                            |
| odt            | application/vnd.oasis.opendocument.text                                   |
| db             | application/vnd.sqlite3                                                   |
| 7z             | application/x-7z-compressed                                               |
| avi            | video/x-msvideo                                                           |
| mp3            | audio/mp3                                                                 |
| mp4            | video/mp4                                                                 |
| oga            | audio/ogg                                                                 |
| ogg            | audio/ogg                                                                 |
| ogm            | video/ogg                                                                 |
| ogv            | video/ogg                                                                 |
| ogx            | application/ogg                                                           |
| wav            | audio/wav                                                                 |
| woff           | font/woff                                                                 |
| woff2          | font/woff2                                                                |
| deb            | application/x-deb                                                         |
| flac           | audio/x-flac                                                              |
| psd            | image/vnd.adobe.photoshop                                                 |
| wasm           | application/wasm                                                          |
| webp           | image/webp                                                                |
| class          | application/java-vm                                                       |
| exe            | application/x-msdownload                                                  |
| json           | application/json                                                          |

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fredmundas%2Ffile-type-mime.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fredmundas%2Ffile-type-mime?ref=badge_large)
