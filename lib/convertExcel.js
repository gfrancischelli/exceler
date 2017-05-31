var convertExcel = require('excel-as-json').processFile;

module.exports = function(file, output = '', options = {}, verbose = false) {
  var options = Object.assign(options, {
    sheet: 1,
    isColorOriented: false,
    omitEmptyFields: false,
  });

  return new Promise((resolve, reject) => {
    if (verbose) console.log(`converting ${file}`);
    convertExcel(file, output, options, (err, data) => {
      if (err) {
        console.log('Error:\n', err);
        reject(err);
      } else {
        if (verbose) {
          console.log(
            `${file}, sheet: ${options.sheet} convertion succeeded\n`,
          );
        }
        resolve(data);
      }
    });
  });
};
