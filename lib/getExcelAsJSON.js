const fs = require('fs');
const path = require('path');
const convertExcel = require('./convertExcel');
const getDirFileNames = require('./getDirFileNames');

async function getExcelAsJSON(dir = '.') {
  const fileNames = await getDirFileNames(dir);

  const promises = Promise.all(fileNames
    .filter(name => name.slice(-4) === 'xlsx')
    .map(name => convertExcel(path.resolve(dir, name)))
  )

  return fileNames.length === 1
    ? promises
    : promises.then(data =>
      data.reduce((acc, item) => acc.concat(item), [])
    )
}

module.exports = getExcelAsJSON;
