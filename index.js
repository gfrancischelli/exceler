const path = require('path');
const fs = require('fs-extra');
const json2xls = require('json2xls');
const isDir = require('is-directory');

const XmlToJSON = require('./lib/XmlToJSON');

exports = module.exports = async function(path, output = 'output.xlsx', fn) {
  const json = isDir.sync(path)
    ? await XmlToJSON.fromDir(path)
    : await XmlToJSON.fromFile(path);

  const data = fn(json);
  const xls = json2xls(data);

  fs.writeFileSync(output, xls, 'binary');
  return data;
};
