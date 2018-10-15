'use strict';

var assert = require('assert');
var fs = require('fs');
var EPUBToText = require('../index');
var tmp = require('tmp');

describe('EpubToText', function() {
  var epubToText = new EPUBToText;

  describe('extract()', function() {

    it('calls back with the number of chapers', function(done) {
      epubToText.extract(__dirname + '/epub30-spec.epub', () => {}, (err, n) => {
        assert.equal(n, 11);
        done();
      });
    });

    it('calls back for every chapter', function(done) {
      var totalCount;
      var processedCount = 0;

      epubToText.extract(__dirname + '/epub30-spec.epub', (err, txt) => {
        processedCount += 1;
        assert.ok(txt);
        if (processedCount >= totalCount) {
          done();
        }
      }, (err, n) => {
        totalCount = n;
      });
    });

    it('get raw content, not HTML', function(done) {
      var totalCount;
      var processedCount = 0;

      epubToText.extract(__dirname + '/epub30-spec.epub', (err, txt) => {
        processedCount += 1;
        assert.ok(txt[0] != '<');
        if (processedCount >= totalCount) {
          done();
        }
      }, (err, n) => {
        totalCount = n;
      });
    });

  });

  describe('extractTo()', function() {

    it('saves all files to disk', function(done) {
      var tmpFolder = tmp.dirSync({unsafeCleanup: true});

      epubToText.extractTo(__dirname + '/epub30-spec.epub', tmpFolder.name, (err) => {
        var files = fs.readdirSync(tmpFolder.name);
        assert.equal(files.length, 11);
        tmpFolder.removeCallback();
        done();
      });
    });

  });
});
