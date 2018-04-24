angular.module('ng.zl.exporter', []).factory('$zlExporter', function () {
    'use strict';

    var fixCSVField = function (value) {
        var fixedValue = value;
        var addQuotes = (value.indexOf(',') !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
        var replaceDoubleQuotes = (value.indexOf('"') !== -1);

        if (replaceDoubleQuotes) {
            fixedValue = fixedValue.replace(/"/g, '""');
        }
        if (addQuotes || replaceDoubleQuotes) {
            fixedValue = '"' + fixedValue + '"';
        }
        return fixedValue;
    };

    var charSet = document.characterSet || 'utf-8';

    var uri = {
        json: 'application/json;charset=' + charSet,
        txt: 'csv/txt;charset=' + charSet,
        csv: 'csv/txt;charset=' + charSet,
        doc: 'application/vnd.ms-doc',
        excel: 'application/vnd.ms-excel'
    };

    // 先转换成二维数据
    //var header = [{field: 'id', name: '编号'}];
    function data2dimension(data, header) {
        return [_.map(header, function (value) {
            return value.name;
        })].concat(_.map(data, function (value) {
            return _.map(header, function (val) {
                return value[val.field] + '';
            });
        }));
    }

    var adc = {};
    adc.csv = function (data, header, type) {
        return _.map(data2dimension(data, header), function (value) {
            return _.map(value, function (val) {
                return fixCSVField(val);
            }).join(',');
        }).join('\n');
    };
    adc.xls = function (data, header, type) {
        var result = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:' + type + '" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="' + charSet + '" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Worksheet</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
        result += '<table><tbody>' + (_.map(data2dimension(data, header), function (value, index) {
                return '<tr>' + (_.map(value, function (val, i) {
                        return '<td>' + val + '</td>';
                    }).join('')) + '</tr>';
            }).join('')) + '</tbody></table>';

        result += '</html>';
        return result;
    };


    var toWhat = function (type) {
        var suf = '.' + type;
        return function (name, data, header) {
            data = angular.copy(data);
            name = name || ('table' + suf);
            if (name.slice(-type.length - 1) !== suf) {
                name += suf;
            }
            var blob = new Blob([adc[type](data, header, type)], {type: uri[type]});
            window.saveAs(blob, name);
        };
    };

    var exporter = {
        toCsv: toWhat('csv'),
        toXls: toWhat('xls')
    };
    return exporter;
});