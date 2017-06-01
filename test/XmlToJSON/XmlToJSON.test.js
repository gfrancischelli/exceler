const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require('path');

const XmlToJSON = require('../../lib/XmlToJSON');

test('Should convert xlsx to json', t => {

  t.test('Should read from file', async function(st) {
    const file = path.resolve(__dirname, '..', 'excel.xlsx');
    const json = await XmlToJSON.fromFile(file);
    st.deepEqual(json, [
      { Name: 'Paul', Age: 10 },
      { Name: 'Astrid', Age: 10 },
      { Name: 'Agnes', Age: '' },
    ]);
    st.end();
  });

  t.test('Should read from dir', async function(st) {
    const dir = path.resolve(__dirname, '..');
    const excel = await XmlToJSON.fromDir(dir);
    st.deepEqual(excel, [[
      { Name: 'Paul', Age: 10 },
      { Name: 'Astrid', Age: 10 },
      { Name: 'Agnes', Age: '' },
    ]]);
    st.end();
  });

  t.end();

});
