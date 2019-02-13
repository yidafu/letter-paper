
/**
 * @see https://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
 * @see https://medium.com/programmers-developers/convert-blob-to-string-in-javascript-944c15ad7d52
 */
function convert(data, encoding1, encoding2) {
  return Buffer.from(data, encoding1).toString(encoding2);
}
module.exports = convert;

exports.base64ToUtf8 = function base64ToUtf8(data) {
  return convert(data, 'base64', 'utf8');
};
