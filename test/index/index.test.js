const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require('path');

const exceler = require('../../index');
const XmlToJSON = require('../../lib/XmlToJSON');

test('Should transform the xlsx files', async function(t) {
  const dir = path.resolve(__dirname, '..');
  const resultPath = path.resolve(__dirname, 'output.xlsx');

  var json = await exceler(dir, 'output.xlsx', data =>
    data.reduce((acc, item) => acc.concat(item), []).map(item => {
      return { name: item.Name };
    }),
  );

  t.deepEqual(json, [{ name: 'Paul' }, { name: 'Astrid' }, { name: 'Agnes' }]);

  t.test('Should write the xlsx result correctly', async function(st) {
    var result_json = await XmlToJSON.fromFile(resultPath);
    st.deepEqual(result_json, [
      { name: 'Paul' },
      { name: 'Astrid' },
      { name: 'Agnes' },
    ]);
    st.end();
  });

  t.end();
});
