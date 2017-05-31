const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require("path");

const getDirFileNames = require('../../lib/getDirFileNames');

test('Should get correct filenames', async function(t) {
  const dir = path.resolve(__dirname);
  const names = await getDirFileNames(dir);
  t.deepEqual(names, ['dummy_file', 'getDirFileNames.test.js']);
  t.end();
});
