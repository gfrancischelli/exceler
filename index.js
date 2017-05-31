const path = require('path');

const fs = require("fs-extra");
const json2xls = require("json2xls");

const getExcelAsJSON = require("./lib/getExcelAsJSON");

exports = module.exports = async function(path, output = "output.xlsx", fn) {
    console.log("path", path)
    var json = await getExcelAsJSON(path);
    var data = fn(json);
    var xls = json2xls(data);
    fs.writeFileSync(output, xls, "binary");
    return data;
}
