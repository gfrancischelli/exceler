const path = require('path');
const fs = require('fs-extra');
const json2xls = require('json2xls');

const XmlToJSON = require('./lib/XmlToJSON');

exports = module.exports = async function(path, output = 'output.xlsx', fn) {
  var json = await XmlToJSON.fromDir(path);
  var data = fn(json);
  var xls = json2xls(data);
  fs.writeFileSync(output, xls, 'binary');
  return data;
};
