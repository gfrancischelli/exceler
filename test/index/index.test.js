const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require('path');

const exceler = require('../../index');
const convertExcel = require('../../lib/convertExcel');

test('Should transform the xlsx files', async function(t) {
  const dir = path.resolve(__dirname, '..');
  const resultPath = path.resolve(__dirname, "output.xlsx");

  var json = await exceler(dir, "output.xlsx", data =>
    data.map(item => {
      return { name: item.Name };
    }),
  );

  t.deepEqual(json, [{ name: 'Paul' }, { name: 'Astrid' }, { name: 'Agnes' }]);

  test('Should write the xlsx result correctly', async function(t) {
    var result_json = await convertExcel(resultPath);
    t.deepEqual(result_json, [{ name: 'Paul' }, { name: 'Astrid' }, { name: 'Agnes' }]);
    t.end();
  })

  t.end();
});
