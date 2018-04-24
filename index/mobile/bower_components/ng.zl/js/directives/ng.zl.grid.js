angular.module('ng.zl.grid', ['ng.zl', 'ng.zl.exporter']).directive('zlGrid', function ($zl, $zlExporter) {
    'use strict';

    /*支持修改文本和修改select。 改后值为新的，此时会调用afterEdit,返回promise,如果失败会回复原始值*/
    /*$scope.gridData = {
     enableSelect: true,
     enableExport: true,
     exportOptions: {xls: true, csv: true, forceString: false},
     columns: [
     {field: 'serialNumber', name: '序号'},
     {field: 'type', name: '类型', edit: true, editType: 'input', afterEdit: afterEdit},
     {field: 'gender', name: '性别', edit: true, editType: 'select', editData: getEditData, afterEdit: afterEdit}
     ],
     actions: [{
     type: 'btn',
     html: '删除',
     action: onDel,
     batch: onDels
     }],
     // 需要返回这种格式 { xxxx: datas, nextPageOffset: x}, 其中 xxxx 是任意，nextPageOffset 也可以是 nextPageAnchor.
     // 返回next,代表nextPageOffset或者nextPageAnchor的值
     getData: function (next) {
     return DataService.getConfigType();
     }
     };*/

    return {
        restrict: 'A',
        replace: true,
        scope: {
            config: '='
        },
        templateUrl: 'views/grid.html',
        controller: function ($scope) {
            _.each($scope.config.columns, function (value) {
                if (value.edit) {
                    value.afterEdit = value.afterEdit || function () {
                        };
                }
            });

            $scope.config = _.extend({
                watchReload: false,
                enableSelect: false,
                enableExport: false,
                exportOptions: {xls: true, csv: true, force2String: false},
                columns: null,
                data: [],
                next: null,
                actions: []
            }, $scope.config);

            $scope.checkAll = false;
            $scope.onCheckAll = function () {
                $scope.checkAll = !$scope.checkAll;
                _.each($scope.config.data, function (value) {
                    value._checked = $scope.checkAll;
                });
            };

            $scope.onBatch = function (action, event) {
                var selects = _.filter($scope.config.data, function (value) {
                    return value._checked;
                });
                if (selects.length > 0) {
                    action.batch(selects, $scope.config.data, event);
                }
            };

            $scope.onAfterEdit = function (value, col, data) {
                if (value.newValue !== value.oldValue) {
                    var promise = col.afterEdit(data, col, value.newValue, value.oldValue);
                    if (promise) {
                        promise.then(function () {
                            $zl.tips('修改成功');
                        }, function () {
                            $zl.tips('修改失败');
                            data[col.field] = value.oldValue;
                        });
                    }
                }
            };

            $scope.onEditData = function (col) {
                return col.editData();
            };

            $scope.$watch('config.watchReload', function (newValue) {
                if (newValue) {
                    $scope.config.data = [];
                    $scope.config.next = null;
                    $scope.getData();
                    $scope.config.watchReload = false;
                }
            });

            $scope.getData = function () {
                $scope.config.getData($scope.config.next).then(function (data) {
                    _.each(data, function (value, key) {
                        if (key !== 'nextPageOffset' && key !== 'nextPageAnchor') {
                            $scope.config.data = $scope.config.data.concat(value || []);
                        }
                    });
                    $scope.config.next = data.nextPageOffset || data.nextPageAnchor;
                });
            };

            $scope.getData();


            $scope.onExport = function (type) {
                var columns = angular.copy($scope.config.columns);
                var data = angular.copy($scope.config.data);

                var exportColumns = _.map(_.filter(columns, function (value) {
                    return value.export !== false;
                }), function (value) {
                    return {field: value.field, name: value.name, export: value.export};
                });
                _.each(exportColumns, function (value) {
                    if(_.isFunction(value.export)){
                        _.each(data, function (val) {
                           val[value.field] = value.export(val[value.field]);
                        });
                    }
                });
                //// 强制转换成字符串 方案不是很晚上，暂不支持
                //if($scope.config.exportOptions.force2String){
                //    _.each(data, function (value) {
                //        _.each(value, function (val, k) {
                //            if(val !== null && val !== undefined){
                //                var s = val.toString();
                //                if(s.length > 0 && s[0] !== '\''){
                //                    value[k] = '\'' + val;
                //                }
                //            }
                //        });
                //    });
                //}
                if(type === 'csv'){
                    $zlExporter.toCsv('table', data, exportColumns);
                }else if(type === 'xls'){
                    $zlExporter.toXls('table', data, exportColumns);
                }

            };

        }
    };
}).directive('zlGridEdit', function ($zlFocusOn, $timeout) {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        scope: {
            gridModel: '=',
            gridAfterEdit: '&'
        },
        templateUrl: 'views/grid.edit.html',
        controller: function ($scope, $element) {
            $scope.edit = false;

            var oldValue = $scope.gridModel;

            // 这里很纠结 如果采用ng-show 的方式,则计算width不准确。因为一开始input显示出来占地方。
            // 如果采用ng-if的话，导致模型更新不及时。 gridModel 还是旧数据
            // and  模型的更新还是挺重要的。 所以采用ng-show 方案。 至于计算宽度问题，一开始把input display:none 掉就好了。 哈哈
            $element.closest('td').width($element.width());

            $scope.onEdit = function (event) {
                $element.addClass('zl-grid-edit-on');
                $scope.edit = true;
                $zlFocusOn('zlGridEditInput');
            };

            $scope.cancelEdit = function (event) {
                $scope.edit = false;
            };

            $scope.onKey = function (event) {
                if (event.keyCode === 13) {
                    $scope.edit = false;
                    // 避免因为模型没有更新，导致数据不正确。故timeout
                    $scope.gridModel = event.target.value;
                    $timeout(function () {
                        $scope.gridAfterEdit({
                            value: {
                                newValue: $scope.gridModel,
                                oldValue: oldValue
                            }
                        });
                    }, 1);
                } else if (event.keyCode === 27) {
                    $scope.edit = false;
                    $scope.gridModel = oldValue;
                }
            };
        }
    };
}).directive('zlGridEditSelect', function ($zlFocusOn, $timeout) {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        scope: {
            gridModel: '=',
            gridAfterEdit: '&',
            gridEditType: '@',
            gridEditData: '&'
        },
        templateUrl: 'views/grid.edit.select.html',
        controller: function ($scope, $element) {
            $scope.edit = false;

            var oldValue = $scope.gridModel;

            $scope.selects = [];
            $scope.selected = null;
            $scope.gridEditData().then(function (data) {
                $scope.selects = data;
                $scope.selected = _.find(data, function (value) {
                    return value.value === $scope.gridModel;
                });
            });

            $element.closest('td').width($element.width());

            $scope.onEdit = function (event) {
                $element.addClass('zl-grid-edit-on');
                $scope.edit = true;
                $zlFocusOn('zlGridEditSelect');
            };

            $scope.cancelEdit = function () {
                $scope.edit = false;
            };

            $scope.onKey = function () {
                if (event.keyCode === 27) {
                    $scope.edit = false;
                    $scope.gridModel = oldValue;
                }
            };

            $scope.onChange = function (event) {
                $scope.edit = false;
                $scope.gridModel = $scope.selected.value;
                // 避免因为模型没有更新，导致数据不正确。故timeout
                $timeout(function () {
                    $scope.gridAfterEdit({
                        value: {
                            newValue: $scope.gridModel,
                            oldValue: oldValue
                        }
                    });
                }, 1);
            };
        }
    };
}).directive('zlGridEditSwitch', function ($zlFocusOn, $timeout) {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        scope: {
            gridModel: '=',
            gridAfterEdit: '&',
            gridEditEver: '='
        },
        templateUrl: 'views/grid.edit.switch.html',
        controller: function ($scope, $element) {
            $scope.edit = false;

            $scope.gridModel = $scope.gridModel || false;
            var oldValue = $scope.gridModel;

            $element.closest('td').width($element.width());

            $scope.onEdit = function (event) {
                $element.addClass('zl-grid-edit-on');
                $scope.edit = true;
                $zlFocusOn('zlGridEditSwitch');
            };

            $scope.cancelEdit = function (event) {
                $scope.edit = false;
            };

            $scope.onKey = function (event) {
                if (event.keyCode === 27) {
                    $scope.edit = false;
                    $scope.gridModel = oldValue;
                }
            };

            $scope.onChange = function (event) {
                $scope.edit = false;
                // 避免因为模型没有更新，导致数据不正确。故timeout
                $timeout(function () {
                    $scope.gridAfterEdit({
                        value: {
                            newValue: $scope.gridModel,
                            oldValue: oldValue
                        }
                    });
                }, 1);
            };
        }
    };
});