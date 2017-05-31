const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require('path');

const getExcelAsJSON = require('../../lib/getExcelAsJSON');

test('Should get json from excel', async function(t) {
  const dir = path.resolve(__dirname, '..');

  const excel = await getExcelAsJSON(dir);
  t.deepEqual(excel, [
    { Name: 'Paul', Age: 10 },
    { Name: 'Astrid', Age: 10 },
    { Name: 'Agnes', Age: '' },
  ]);
  t.end();
});
