'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.build = build;

var _xlsxStyle = require('xlsx-style');

var _xlsxStyle2 = _interopRequireDefault(_xlsxStyle);

var _helpers = require('./helpers');

var _workbook = require('./workbook');

var _workbook2 = _interopRequireDefault(_workbook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(mixed) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var workSheet = _xlsxStyle2.default[(0, _helpers.isString)(mixed) ? 'readFile' : 'read'](mixed, options);
  return Object.keys(workSheet.Sheets).map(function (name) {
    var sheet = workSheet.Sheets[name];
    return { name: name, data: _xlsxStyle2.default.utils.sheet_to_json(sheet, { header: 1, raw: options.raw !== false }) };
  });
}

function build(worksheets) {
  var defaults = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  var workBook = new _workbook2.default();
  worksheets.forEach(function (worksheet) {
    var name = worksheet.name || 'Sheet';
    var data = (0, _helpers.buildSheetFromMatrix)(worksheet.data || [], worksheet.option);
    workBook.SheetNames.push(name);
    workBook.Sheets[name] = data;
  });
  var excelData = _xlsxStyle2.default.write(workBook, Object.assign({}, defaults));
  return excelData instanceof Buffer ? excelData : Buffer.from(excelData, 'binary');
}

exports.default = { parse: parse, build: build };
//# sourceMappingURL=index.js.map