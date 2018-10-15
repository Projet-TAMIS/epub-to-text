'use strict'

var fs = require('fs');
var EPub = require('epub');
var htmlToText = require('html-to-text');
var path = require('path');

class EPUBToText {
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
  extract(sourceFile, callback, initialCallback) {
    var epub = new EPub(sourceFile);

    // callback fired for each chapter (or they are written to disk)
    epub.on('end', function() {
      epub.flow.forEach(function(chapter, sequence) {
        epub.getChapter(chapter.id, function(err, html) {
          var txt = htmlToText.fromString(html.toString(), {ignoreHref: true});
          callback(err, txt, sequence);
        });
      });
    });

    // callback as soon as file is ready to give info on how many chapters will be processed
    epub.on('end', function() {
      if (initialCallback) {
        initialCallback(null, epub.flow.length);
      };
    });

    epub.parse();
  }

  /**
   * EpubToText#extractTo()
   *
   * Opens the EPUB in sourceFile and saves all chapters
   * in destFolder. Chapters will be name according to the
   * original file name, prefixed by a 5-digit sequence number
   * Call a callback function when done.
   * Callback parameters are (err)
   **/
  extractTo(sourceFile, destFolder, callback) {
    var totalCount;
    var processedCount = 0;

    this.extract(sourceFile, (err, txt, sequence) => {
      var destFile = destFolder + '/' + sequence + '-' + path.basename(sourceFile) + '.txt'
      fs.writeFileSync(destFile, txt);
      processedCount += 1;
      if (processedCount >= totalCount) {
        callback(null);
      }
    }, (err, numberOfChapters) => {
      totalCount = numberOfChapters
    });
  }
}

module.exports = EPUBToText;
