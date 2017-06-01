const fs = require('fs');
const path = require('path');
const xlso = require('xlso');
const xlsx = require('xlsx');

const getDirFileNames = require('./getDirFileNames');

async function getJSONFromXmlFiles(dir = '.') {
  const fileNames = await getDirFileNames(dir);
  return Promise.all(
    fileNames
      .filter(name => name.slice(-4) === 'xlsx')
      .map(name => getJSONFromXmlFile(path.resolve(dir, name))),
  );
}

function getJSONFromXmlFile(file, output = '', options = {}, verbose = false) {
  return file.slice(-4) !== 'xlsx'
    ? Promise.reject({ error: `${file} must be a .xlsx` })
    : new Promise((resolve, reject) => {
        if (verbose) console.log(`converting ${file}`);
        fs.readFile(file, (err, data) => {
          if (err) {
            console.log('Error:\n', err);
            reject(err);
          } else {
            if (verbose) {
              console.log(
                `${file}, sheet: ${options.sheet} convertion succeeded\n`,
              );
            }
            var workBook = xlsx.read(data, { type: 'buffer' });
            var json = xlso.parseWorkbook(workBook, 0, 0);
            resolve(json);
          }
        });
      });
}

const XmlToJSON = {
  fromDir: getJSONFromXmlFiles,
  fromFile: getJSONFromXmlFile,
};

module.exports = XmlToJSON;
