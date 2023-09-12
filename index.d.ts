export = EPUBToText;
declare class EPUBToText {
  /**
   * EpubToText#extract()
   *
   * Opens the EPUB in sourceFile, extracts all chapters
   * and calls a callback function with the chapter content.
   * Callback parameters are (err, chapterText, sequenceNumber).
   *
   * An optional callback function can also be called initially,
   * at the beginning of the extraction.
   * Callback parameters are (err, numberOfChapters)
   **/
  extract(
    sourceFile: string,
    callback: (err: Error, text: string, n: number, meta: Meta) => void,
    initialCallback?: any
  ): void;
  /**
   * EpubToText#extractTo()
   *
   * Opens the EPUB in sourceFile and saves all chapters
   * in destFolder. Chapters will be name according to the
   * original file name, prefixed by a 5-digit sequence number
   * Call a callback function when done.
   * Callback parameters are (err)
   **/
  extractTo(sourceFile: string, destFolder: string, callback: any): void;
  /**
   * EpubToText#getTitleFromHtml()
   *
   * Best efforts to find a title in the HTML tags (title, H1, etc.)
   **/
  getTitleFromHtml(html: any): string;
}

declare module "epub-to-text";

type Meta = {
    excerpt: string;
    size: number;
    title: string;
    sequence: number;
    id: string;
}
