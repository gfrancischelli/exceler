const fs = require('fs');
var xlso = require('xlso');
var xlsx = require('xlsx');

module.exports = function(file, output = '', options = {}, verbose = false) {
  return new Promise((resolve, reject) => {
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
        var workBook = xlsx.read(data, {type: "buffer"});
        var json = xlso.parseWorkbook(workBook, 0, 0);
        resolve(json);
      }
    });
  });
};
