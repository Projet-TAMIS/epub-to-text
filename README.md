# EPUBToText

EPUBToText is a node.js module to convert EPUB files to plain text chapters.

## Usage

### Processing content

To get the chapters as strings:

```js
var epubToText = new EPUBToText;
epubToText.extract('epub_file.epub', (err, txt, n) => {
  // txt is the plain text version of chapter number n
})
```

If you need to know how many chapters are in the EPUB file, you can do:

```js
var epubToText = new EPUBToText;
epubToText.extract('epub_file.epub', (err, txt, n) => {
  // txt is the plain text version of chapter number n
}, (err, N) => {
  // N is the number of chapters
})
```

You can also get some metadata about each chapter. The title information may or may not be available, depending on the EPUB structure (the parser looks for the title in EPUB navMap if there is one, otherwise tries to get it directly form the HTML, looking for the first `<title>` or `<h1>` tag).

```js
var epubToText = new EPUBToText;
epubToText.extract('epub_file.epub', (err, txt, n, meta) => {
  // meta.id is the chapter internal id
  // meta.title contains a string that hopefully is the title name, or is empty
  // meta.excerpt contains a 250 characters string from the chapter content
  // meta.size is the size of the chapter, in number of characters
}, (err, N) => {
  // N is the number of chapters
})
```


### Writing to disk

To write the chapters to disk:

```js
var epubToText = new EPUBToText;
epubToText.extractTo('epub_file.epub', 'full_path_to_dest_folder', (err) => {
  // files are in folder, name according to the following convention:
  //   sequence number + original epub file name + .txt
})
```
