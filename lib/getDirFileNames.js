var fs = require('fs');
var path = require('path');

module.exports = function getDirFileNames(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(__dirname, dir), (err, files) => {
      if (err) {
        console.log("Failed to read dir: \n", err);
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}
