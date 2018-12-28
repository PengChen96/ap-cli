/**
 * Created by Administrator on 2018/9/24.
 */

const assert = require('assert');

describe('#test.js', () => {
  describe('#sum()', () => {
    it('1+1 should return 2', () => {
      assert.strictEqual(1 + 1, 2);
    });
  });
});

// TEST swagger convert to json template
describe('#swagger_index.js', () => {
  describe('#generateJsonTpl()', () => {
    it('should generate json template without error', () => {
      const swagger = require('../server/router/swagger/index');
      swagger.convertToJsonTpl('/test/sw_test_file.json');
    });
  });
});

// TEST json template convert to markdown file
describe('#markdown_index.js', () => {
  describe('#generateMdFile()', () => {
    it('should md file without error', () => {
      const markdown = require('../server/router/markdown/index');
      const mdTestTpl = require('./md_test_file.json');
      markdown.createMd(mdTestTpl[0], 'interFace.md', "test");
    });
  });
});