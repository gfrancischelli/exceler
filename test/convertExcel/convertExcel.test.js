const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require('path');

const convertExcel = require('../../lib/convertExcel');

test('Should convert excel', async function(t) {
  const file = path.resolve(__dirname, '..', 'excel.xlsx');
  const json = await convertExcel(file);
  t.deepEqual(json, [
    { Name: 'Paul', Age: 10 },
    { Name: 'Astrid', Age: 10 },
    { Name: 'Agnes', Age: '' },
  ]);
  t.end();
});
