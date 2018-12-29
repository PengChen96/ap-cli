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
describe('#swagger_index.js', function() {
  describe('#generateJsonTpl()', function() {
    it('should generate json template without error', function() {
      const parseSwagger = require('../server/router/swagger/parseSwagger');
      const swaggerContent = require('./sw_test_file.json');
      parseSwagger.formatSwaggerData(swaggerContent);
    });
  });
});

// TEST json template convert to markdown file
// describe('#markdown_index.js', function() {
//   describe('#generateMdFile()', function() {
//     it('should md file without error', function() {
//       const markdown = require('../server/router/markdown/index');
//       const mdTestTpl = require('./md_test_file.json');
//       markdown.createMd(mdTestTpl[0], 'interFace.md', "test");
//     });
//   });
// });