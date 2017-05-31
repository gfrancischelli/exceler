const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape);
const path = require('path');

const exceler = require('../../index');
const getExcelAsJSON = require('../../lib/getExcelAsJSON');

test('Should transform the xlsx files', async function(t) {
  const dir = path.resolve(__dirname, '..');

  var json = await exceler(dir, "output.xlsx", data =>
    data.map(item => {
      return { name: item.Name };
    }),
  );

  t.deepEqual(json, [{ name: 'Paul' }, { name: 'Astrid' }, { name: 'Agnes' }]);

  t.end();
});
