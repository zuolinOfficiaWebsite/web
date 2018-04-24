angular.module('ng.zl', ['ng', 'ngSanitize','ngMaterial','ng.zl.sha256', 'ng.zl.templates']);
angular.module('ng.zl.pick', ['ng.zl']);
(function () {
    'use strict';

    var html = '<div class="jumbotron">' +
        '<div class="container">' +
        '<h1>深感抱歉！</h1>' +
        '<p>我们暂时支持不了你的浏览器。</p>' +
        '<p>为了更好的体验我们的产品，推荐使用以下浏览器！</p>' +
        '<p>' +
        '<a href="https://www.baidu.com/s?wd=chrome">Chrome <span class="text-success">(推荐)</span></a>' +
        '<br/>' +
        '<a href="https://www.baidu.com/s?wd=firefox">Firefox</a>' +
        '<br/>' +
        '<a href="https://www.baidu.com/s?wd=360">360浏览器（极速模式）</a>' +
        '<a href="https://www.baidu.com/s?wd=360极速浏览器">360极速浏览器 </a>' +
        '<br/>' +
        '</p>' +
        '<p>其他浏览器的极速模式 或 支持H5的浏览器</p>' +
        '<p>ie系列不支持</p>' +
        '</div>' +
        '</div>';

    var ua = window.navigator.userAgent;

    if(!(ua.indexOf('AppleWebKit') > -1 || ua.indexOf('Gecko') > -1)){
        document.body.innerHTML = html;
    }
})();
angular.module("ng.zl.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/apartment.pick.html","<div>\n    <md-autocomplete ng-if=\"!pickChips\" flex required\n                     md-selected-item=\"pick.ngModel\"\n                     md-search-text=\"searchText\"\n                     md-items=\"item in querySearch(searchText)\"\n                     md-no-cache=\"true\"\n                     md-delay=\"500\"\n                     md-item-text=\"item.apartmentName\"\n                     md-autoselect=\"true\"\n                     ng-disabled=\"!pickCommunityId\"\n                     md-floating-label=\"APARTMENT\">\n        <md-item-template>\n            <span md-highlight-text=\"searchText\">{{item.apartmentName}} </span>\n        </md-item-template>\n        <md-not-found>\n            No matches found\n        </md-not-found>\n    </md-autocomplete>\n\n\n    <md-chips ng-if=\"pickChips\" ng-model=\"pick.ngModel\" md-autocomplete-snap md-require-match>\n        <md-autocomplete\n                md-selected-item=\"selectedItem\"\n                md-search-text=\"searchText\"\n                md-items=\"item in querySearch(searchText)\"\n                md-no-cache=\"true\"\n                md-delay=\"500\"\n                md-item-text=\"item.apartmentName\"\n                md-autoselect=\"true\"\n                ng-disabled=\"!pickCommunityId\"\n                placeholder=\"APARTMENT\">\n            <md-item-template>\n                <span md-highlight-text=\"searchText\">{{item.apartmentName}}</span>\n            </md-item-template>\n            <md-not-found>\n                No matches found\n            </md-not-found>\n        </md-autocomplete>\n        <md-chip-template>\n        <span>\n          <strong>{{$chip.apartmentName}}</strong>\n        </span>\n        </md-chip-template>\n    </md-chips>\n</div>");
$templateCache.put("views/building.pick.html","<div>\n    <md-autocomplete ng-if=\"!pickChips\" flex required\n                     md-selected-item=\"pick.ngModel\"\n                     md-search-text=\"searchText\"\n                     md-items=\"item in querySearch(searchText)\"\n                     md-no-cache=\"true\"\n                     md-delay=\"500\"\n                     md-item-text=\"item.buildingName\"\n                     md-autoselect=\"true\"\n                     ng-disabled=\"!pickCommunityId\"\n                     md-floating-label=\"BUILDING\">\n        <md-item-template>\n            <span md-highlight-text=\"searchText\">{{item.buildingName}} </span>\n        </md-item-template>\n        <md-not-found>\n            No matches found\n        </md-not-found>\n    </md-autocomplete>\n\n\n    <md-chips ng-if=\"pickChips\" ng-model=\"pick.ngModel\" md-autocomplete-snap md-require-match>\n        <md-autocomplete\n                md-selected-item=\"selectedItem\"\n                md-search-text=\"searchText\"\n                md-items=\"item in querySearch(searchText)\"\n                md-no-cache=\"true\"\n                md-delay=\"500\"\n                md-item-text=\"item.buildingName\"\n                md-autoselect=\"true\"\n                ng-disabled=\"!pickCommunityId\"\n                placeholder=\"BUILDING\">\n            <md-item-template>\n                <span md-highlight-text=\"searchText\">{{item.buildingName}}</span>\n            </md-item-template>\n            <md-not-found>\n                No matches found\n            </md-not-found>\n        </md-autocomplete>\n        <md-chip-template>\n        <span>\n          <strong>{{$chip.buildingName}}</strong>\n        </span>\n        </md-chip-template>\n    </md-chips>\n</div>");
$templateCache.put("views/community.pick.html","<div>\n    <md-autocomplete ng-if=\"!pickChips\" flex required\n                     md-selected-item=\"pick.ngModel\"\n                     md-search-text=\"searchText\"\n                     md-items=\"item in querySearch(searchText)\"\n                     md-no-cache=\"true\"\n                     md-delay=\"500\"\n                     md-item-text=\"item.name\"\n                     md-autoselect=\"true\"\n                     ng-disabled=\"!pickCityId\"\n                     md-floating-label=\"COMMUNITY\">\n        <md-item-template>\n            <span md-highlight-text=\"searchText\">{{item.name}} </span>\n        </md-item-template>\n        <md-not-found>\n            No matches found\n        </md-not-found>\n    </md-autocomplete>\n\n\n    <md-chips ng-if=\"pickChips\" ng-model=\"pick.ngModel\" md-autocomplete-snap md-require-match>\n        <md-autocomplete\n                md-selected-item=\"selectedItem\"\n                md-search-text=\"searchText\"\n                md-items=\"item in querySearch(searchText)\"\n                md-no-cache=\"true\"\n                md-delay=\"500\"\n                md-item-text=\"item.name\"\n                md-autoselect=\"true\"\n                ng-disabled=\"!pickCityId\"\n                placeholder=\"COMMUNITY\">\n            <md-item-template>\n                <span md-highlight-text=\"searchText\">{{item.name}}</span>\n            </md-item-template>\n            <md-not-found>\n                No matches found\n            </md-not-found>\n        </md-autocomplete>\n        <md-chip-template>\n        <span>\n          <strong>{{$chip.name}}</strong>\n        </span>\n        </md-chip-template>\n    </md-chips>\n</div>");
$templateCache.put("views/grid.edit.html","<div class=\"zl-grid-edit\" ng-dblclick=\"onEdit($event)\">\r\n    <span ng-show=\"!edit\">{{gridModel}}&nbsp;</span>\r\n    <input type=\"text\" tabindex=\"-1\" ng-model=\"gridModel\" ng-show=\"edit\" ng-blur=\"cancelEdit($event)\" ng-keyup=\"onKey($event)\" zl-focus-on=\"zlGridEditInput\"/>\r\n</div>");
$templateCache.put("views/grid.edit.select.html","<div class=\"zl-grid-edit\" ng-dblclick=\"onEdit($event)\">\r\n    <span ng-bind=\"gridModel\" ng-show=\"!edit\"></span>\r\n    <select tabindex=\"-1\" ng-model=\"selected\" ng-show=\"edit\" zl-focus-on=\"zlGridEditSelect\" ng-blur=\"cancelEdit($event)\" ng-options=\"value.name for value in selects\" ng-change=\"onChange($event)\" ng-keyup=\"onKey($event)\">\r\n    </select>\r\n</div>");
$templateCache.put("views/grid.edit.switch.html","<div class=\"zl-grid-edit\" ng-dblclick=\"onEdit($event)\">\r\n    <span ng-bind=\"gridModel\" ng-show=\"!(gridEditEver || edit)\"></span>\r\n\r\n    <md-switch class=\"md-primary\" tabindex=\"-1\" ng-model=\"gridModel\" aria-label=\"Switch\" zl-focus-on=\"zlGridEditSwitch\" ng-show=\"gridEditEver || edit\" ng-blur=\"cancelEdit($event)\" ng-keyup=\"onKey($event)\" ng-change=\"onChange($event)\"></md-switch>\r\n\r\n</div>");
$templateCache.put("views/grid.html","<div class=\"zl-grid\">\r\n    <table class=\"table table-striped table-hover table-condensed\">\r\n        <thead>\r\n        <tr>\r\n            <th ng-if=\"config.enableSelect\" class=\"zl-grid-select\">\r\n                <md-checkbox ng-click=\"onCheckAll($event)\"></md-checkbox>\r\n            </th>\r\n            <th ng-repeat=\"col in config.columns\" ng-bind=\"col.name\"></th>\r\n            <th ng-if=\"config.actions.length > 0\">操作</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr ng-repeat=\"(rowIndex, data) in config.data\">\r\n            <td ng-if=\"config.enableSelect\" class=\"zl-grid-select\">\r\n                <md-checkbox ng-model=\"data._checked\"></md-checkbox>\r\n            </td>\r\n            <td ng-repeat=\"(columnIndex, col) in config.columns\">\r\n                <span ng-if=\"!col.edit && col.render\" style=\"{{col.style}}\">\r\n                    <div zl-compile html=\"{{col.render(data[col.field])}}\"></div>\r\n                </span>\r\n                <span ng-if=\"!col.edit && !col.render\" ng-bind=\"data[col.field]\" style=\"{{col.style}}\"></span>\r\n\r\n                <div ng-if=\"col.edit && col.editType === \'input\'\">\r\n                    <div zl-grid-edit grid-model=\"data[col.field]\"\r\n                         grid-after-edit=\"onAfterEdit(value, col, data)\"></div>\r\n                </div>\r\n                <div ng-if=\"col.edit && col.editType === \'select\'\">\r\n                    <div zl-grid-edit-select grid-model=\"data[col.field]\" grid-edit-type=\"col.editType\"\r\n                         grid-edit-data=\"col.editData()\" grid-after-edit=\"onAfterEdit(value, col, data)\"></div>\r\n                </div>\r\n                <div ng-if=\"col.edit && col.editType === \'switch\'\">\r\n                    <div zl-grid-edit-switch grid-model=\"data[col.field]\"\r\n                         grid-after-edit=\"onAfterEdit(value, col, data)\" grid-edit-ever=\"col.editEver\"></div>\r\n                </div>\r\n            </td>\r\n\r\n            <td ng-if=\"config.actions.length > 0\">\r\n                <md-button ng-repeat=\"act in config.actions\" class=\"md-raised {{act.className}}\" ng-bind=\"act.html\"\r\n                           ng-click=\"act.action(data, config.data, $event)\"></md-button>\r\n            </td>\r\n        </tr>\r\n        </tbody>\r\n    </table>\r\n    <div layout=\"row\">\r\n        <md-button class=\"md-raised\" ng-click=\"getData()\" ng-if=\"config.next\">更多</md-button>\r\n        <md-button class=\"md-raised\" ng-if=\"!config.next\" ng-disabled=\"true\">没有更多</md-button>\r\n        <div flex ng-if=\"config.enableSelect && config.actions.length > 0\">\r\n            <md-button ng-repeat=\"act in config.actions\" ng-if=\"act.batch\" class=\"md-raised {{act.className}}\"\r\n                       ng-bind=\"act.html\"\r\n                       ng-click=\"onBatch(act, $event)\"></md-button>\r\n        </div>\r\n        <div flex layout=\"row\" layout-align=\"end\">\r\n            <md-button ng-if=\"config.enableExport && config.exportOptions.xls\" ng-click=\"onExport(\'xls\')\">导出xls</md-button>\r\n            <md-button ng-if=\"config.enableExport && config.exportOptions.csv\" ng-click=\"onExport(\'csv\')\">导出csv</md-button>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("views/progress.html","<div class=\"zl-progress\" ng-if=\"show\">\r\n    <md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>\r\n</div>");
$templateCache.put("views/prompt.html","<md-dialog>\r\n    <md-dialog-content>\r\n        <h2 ng-if=\"config.title\">{{config.title}}</h2>\r\n        <p>{{config.content}}</p>\r\n        <md-input-container md-no-float>\r\n            <input ng-model=\"result\" placeholder=\"\">\r\n        </md-input-container>\r\n    </md-dialog-content>\r\n    <div class=\"md-actions\">\r\n        <md-button ng-click=\"onCancel()\" class=\"md-primary\">{{config.cancel | uppercase}}</md-button>\r\n        <md-button ng-click=\"onOk()\" class=\"md-primary\">{{config.ok | lowercase}}</md-button>\r\n    </div>\r\n</md-dialog>");
$templateCache.put("views/region.pick.html","<div>\n    <md-autocomplete ng-if=\"!pickChips\" flex required\n                     md-selected-item=\"pick.ngModel\"\n                     md-search-text=\"searchText\"\n                     md-items=\"item in querySearch(searchText)\"\n                     md-no-cache=\"true\"\n                     md-delay=\"500\"\n                     md-item-text=\"item.name\"\n                     md-autoselect=\"true\"\n                     ng-disabled=\"(needRegionParent && !regionParent)\"\n                     md-floating-label=\"{{name | uppercase}}\">\n        <md-item-template>\n            <span md-highlight-text=\"searchText\">{{item.name}} </span>\n            <small md-highlight-text=\"searchText\">({{item.path}})</small>\n        </md-item-template>\n        <md-not-found>\n            No matches found\n        </md-not-found>\n    </md-autocomplete>\n\n\n    <md-chips ng-if=\"pickChips\" ng-model=\"pick.ngModel\" md-autocomplete-snap md-require-match>\n        <md-autocomplete\n                md-selected-item=\"selectedItem\"\n                md-search-text=\"searchText\"\n                md-items=\"item in querySearch(searchText)\"\n                md-no-cache=\"true\"\n                md-delay=\"500\"\n                md-item-text=\"item.name\"\n                md-autoselect=\"true\"\n                ng-disabled=\"(needRegionParent && !regionParent)\"\n                placeholder=\"{{name | uppercase}}\">\n            <md-item-template>\n                <span md-highlight-text=\"searchText\">{{item.name}}</span>\n                <small md-highlight-text=\"searchText\">({{item.path}})</small>\n            </md-item-template>\n            <md-not-found>\n                No matches found\n            </md-not-found>\n        </md-autocomplete>\n        <md-chip-template>\n        <span>\n          <strong>{{$chip.name}}</strong><small>({{$chip.path}})</small>\n        </span>\n        </md-chip-template>\n    </md-chips>\n</div>");
$templateCache.put("views/scroll.html","<div class=\"zl-scroll\">\r\n    <div ng-show=\"isShow\">\r\n    <md-button class=\"md-fab md-primary md-mini\" ng-click=\"onTop()\" ng-if=\"top\">\r\n        t\r\n    </md-button>\r\n\r\n    <md-button class=\"md-fab md-primary md-mini\" ng-click=\"onBottom()\" ng-if=\"bottom\">\r\n        b\r\n    </md-button>\r\n    </div>\r\n</div>");
$templateCache.put("views/toast.html","<div class=\"zl-toast-container\">\r\n    <md-toast ng-repeat=\"t in list\" class=\"md-default-theme\">\r\n        <span ng-bind=\"t.word\"></span>\r\n    </md-toast>\r\n</div>");}]);
angular.module('ng.zl.pick').directive('zlApartmentPick', ["$zlPickService", function ($zlPickService) {
    'use strict';

    // 有点复杂，不写注释了

    return {
        restrict: 'A',
        replace: true,
        scope: {
            pickCommunityId: '=',
            pickBuildingName: '=',
            ngModel: '=',
            pickChips: '='
        },
        templateUrl: 'views/apartment.pick.html',
        controller: ["$scope", function ($scope) {
            $scope.pickChips = $scope.pickChips || false;

            // 传引用过去
            $scope.pick = {
                ngModel: $scope.pickChips ? [] : null
            };

            $scope.$watch('pick.ngModel', function(newValue){
                $scope.ngModel = newValue;
            });

            $scope.querySearch = function (searchText) {
                return $zlPickService.getApartmentByWord({
                    buildingName: $scope.pickBuildingName,
                    communityId: $scope.pickCommunityId,
                    keyword: searchText
                }).then(function (data) {
                    if ($scope.pickChips) {
                        return _.filter(data, function (value) {
                            return !isExist(value, $scope.pick.ngModel);
                        });
                    }
                    return data;
                });
            };

            function isExist(item, items) {
                var result = false;
                _.each(items, function (value) {
                    if (value.addressId === item.addressId) {
                        result = true;
                    }
                });
                return result;
            }
        }]
    };
}]);

angular.module('ng.zl.pick').directive('zlBuildingPick', ["$zlPickService", function ($zlPickService) {
    'use strict';

    // 有点复杂，不写注释了

    return {
        restrict: 'A',
        replace: true,
        scope: {
            pickCommunityId: '=',
            ngModel: '=',
            pickChips: '='
        },
        templateUrl: 'views/building.pick.html',
        controller: ["$scope", function ($scope) {
            $scope.pickChips = $scope.pickChips || false;

            // 传引用过去
            $scope.pick = {
                ngModel: $scope.pickChips ? [] : null
            };

            $scope.$watch('pick.ngModel', function(newValue){
                $scope.ngModel = newValue;
            });

            $scope.querySearch = function (searchText) {
                return $zlPickService.getBuildingByWord({
                    communityId: $scope.pickCommunityId,
                    keyword: searchText
                }).then(function (data) {
                    if ($scope.pickChips) {
                        return _.filter(data, function (value) {
                            return !isExist(value, $scope.pick.ngModel);
                        });
                    }
                    return data;
                });
            };

            function isExist(item, items) {
                var result = false;
                _.each(items, function (value) {
                    if (value.buildingName === item.buildingName) {
                        result = true;
                    }
                });
                return result;
            }
        }]
    };
}]);

angular.module('ng.zl.pick').directive('zlCommunityPick', ["$zlPickService", function ($zlPickService) {
    'use strict';

    // 有点复杂，不写注释了

    return {
        restrict: 'A',
        replace: true,
        scope: {
            pickCityId: '=',
            ngModel: '=',
            pickChips: '='
        },
        templateUrl: 'views/community.pick.html',
        controller: ["$scope", function ($scope) {
            $scope.pickChips = $scope.pickChips || false;

            // 传引用过去
            $scope.pick = {
                ngModel: $scope.pickChips ? [] : null
            };

            $scope.$watch('pick.ngModel', function(newValue){
                $scope.ngModel = newValue;
            });

            $scope.querySearch = function (searchText) {
                return $zlPickService.getCommunityByWord({
                    cityId: $scope.pickCityId,
                    keyword: searchText
                }).then(function (data) {
                    if ($scope.pickChips) {
                        return _.filter(data, function (value) {
                            return !isExist(value, $scope.pick.ngModel);
                        });
                    }
                    return data;
                });
            };

            function isExist(item, items) {
                var result = false;
                _.each(items, function (value) {
                    if (value.id === item.id) {
                        result = true;
                    }
                });
                return result;
            }
        }]
    };
}]);

angular.module('ng.zl').directive('zlCompile', ["$compile", function ($compile) {
    'use strict';
    return {
        replace: true,
        restrict: 'A',
        link: function (scope, elm, attrs) {
            if(attrs.html){
                var dom = $compile(attrs.html)(scope);
                elm.replaceWith(dom);
            }
        }
    };
}]);

angular.module('ng.zl').directive('zlDyCompile', ["$compile", function ($compile) {
    'use strict';
    return {
        replace: true,
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var DUMMY_SCOPE = {
                    $destroy: angular.noop
                },
                root = elm,
                childScope,
                destroyChildScope = function () {
                    (childScope || DUMMY_SCOPE).$destroy();
                };

            attrs.$observe('html', function (html) {
                if (html) {
                    destroyChildScope();
                    childScope = scope.$new(true);
                    var content = $compile(html)(scope);
                    root.replaceWith(content);
                    root = content;
                }

                scope.$on('$destroy', destroyChildScope);
            });
        }
    };
}]);

angular.module('ng.zl').directive('zlFocusOn', function () {
    'use strict';
    return function (scope, elem, attr) {
        return scope.$on('zlFocusOn', function (e, name) {
            if (name === attr.zlFocusOn) {
                return elem[0].focus();
            }
        });
    };
});
angular.module('ng.zl.grid', ['ng.zl', 'ng.zl.exporter']).directive('zlGrid', ["$zl", "$zlExporter", function ($zl, $zlExporter) {
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
        controller: ["$scope", function ($scope) {
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

        }]
    };
}]).directive('zlGridEdit', ["$zlFocusOn", "$timeout", function ($zlFocusOn, $timeout) {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        scope: {
            gridModel: '=',
            gridAfterEdit: '&'
        },
        templateUrl: 'views/grid.edit.html',
        controller: ["$scope", "$element", function ($scope, $element) {
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
        }]
    };
}]).directive('zlGridEditSelect', ["$zlFocusOn", "$timeout", function ($zlFocusOn, $timeout) {
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
        controller: ["$scope", "$element", function ($scope, $element) {
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
        }]
    };
}]).directive('zlGridEditSwitch', ["$zlFocusOn", "$timeout", function ($zlFocusOn, $timeout) {
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
        controller: ["$scope", "$element", function ($scope, $element) {
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
        }]
    };
}]);
angular.module('ng.zl.pick').directive('zlRegionPick', ["$zlPickService", function ($zlPickService) {
    'use strict';

    // 有点复杂，不写注释了

    return {
        restrict: 'A',
        replace: true,
        scope: {
            regionParent: '=',
            ngModel: '=',
            pickChips: '='
        },
        templateUrl: 'views/region.pick.html',
        controller: ["$scope", "$attrs", function ($scope, $attrs) {
            $scope.pickChips = $scope.pickChips || false;

            // 传引用过去
            $scope.pick = {
                ngModel: $scope.pickChips ? [] : null
            };

            $scope.$watch('pick.ngModel', function(newValue){
                $scope.ngModel = newValue;
            });

            $scope.needRegionParent = $attrs.regionParent !== undefined;
            $scope.name = $attrs.zlRegionPick;

            var api = '';
            if ($scope.name === 'province') {
                api = 'getProvinceByWord';
            } else if ($scope.name === 'city') {
                api = 'getCityByWord';
            } else if ($scope.name === 'area') {
                api = 'getAreaByWord';
            }

            $scope.querySearch = function (searchText) {
                return $zlPickService[api]({
                    parentId: $scope.regionParent && $scope.regionParent.id || null,
                    keyword: searchText
                }).then(function (data) {
                    if ($scope.pickChips) {
                        return _.filter(data, function (value) {
                            return !isExist(value, $scope.pick.ngModel);
                        });
                    }
                    return data;
                });
            };

            function isExist(item, items) {
                var result = false;
                _.each(items, function (value) {
                    if (value.id === item.id) {
                        result = true;
                    }
                });
                return result;
            }
        }]
    };
}]);

angular.module('ng.zl').directive('zlScroll', ["$zl", "$mdMedia", function ($zl, $mdMedia) {
    'use strict';
    return {
        restrict: 'A',
        replace: true,
        scope: {},
        templateUrl: 'views/scroll.html',
        controller: ["$scope", "$element", function ($scope, $element) {

            var params = $element.attr('zl-scroll');
            if (params.indexOf('scroll-top') > -1) {
                $scope.top = true;
            }
            if (params.indexOf('scroll-bottom') > -1) {
                $scope.bottom = true;
            }

            $scope.onTop = function () {
                $zl.scroll.top();
            };

            $scope.onBottom = function () {
                $zl.scroll.bottom();
            };

            $scope.isShow = $mdMedia('gt-md');
        }]
    };
}]);
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
angular.module('ng.zl').factory('$zlFocusOn', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
    'use strict';
    return function (name) {
        return $timeout(function () {
            return $rootScope.$broadcast('zlFocusOn', name);
        });
    };
}]);
angular.module('ng.zl').factory('$zl', ["$mdDialog", "$mdToast", "$compile", "$rootScope", "$templateRequest", "$timeout", "$zlSha256", "$q", function ($mdDialog, $mdToast, $compile, $rootScope, $templateRequest, $timeout, $zlSha256, $q) {
    'use strict';

    var $container = $(document.body);

    var alert = function (word, title, ev) {
        var d = $mdDialog.alert().parent($container).title(title).content(word).ok('ok');
        if (ev) {
            d = d.targetEvent(ev);
        }
        return $mdDialog.show(d);
    };
    var confirm = function (word, title, ev, ok, cancel) {
        ok = ok || 'ok';
        cancel = cancel || 'cancel';
        var d = $mdDialog.confirm().parent($container).title(title).content(word).ok(ok).cancel(cancel);
        if (ev) {
            d = d.targetEvent(ev);
        }
        return $mdDialog.show(d);
    };
    var prompt = function (word, title, ev, ok, cancel) {
        ok = ok || 'ok';
        cancel = cancel || 'cancel';
        //var d = $mdDialog.confirm().parent($container).title(title).content(word + '<input type="text" />').ok(ok).cancel(cancel);
        //if (ev) {
        //    d = d.targetEvent(ev);
        //}
        return $mdDialog.show({
            targetEvent: ev,
            templateUrl: 'views/prompt.html',
            controller: ["$scope", "config", function ($scope, config) {
                $scope.config = config;

                $scope.result = '';
                $scope.onCancel = function () {
                    $mdDialog.cancel();
                };
                $scope.onOk = function () {
                    $mdDialog.hide($scope.result);
                };
            }],
            locals: {
                config: {
                    title: title,
                    content: word,
                    ok: ok,
                    cancel: cancel
                }
            }
        });
    };

    var _$toast = null;
    var _toastScope = $rootScope.$new();
    _toastScope.list = [];
    var toast = function (word, type, time) {
        var def = $q.defer();

        if (!_$toast) {
            _$toast = true;
            $templateRequest('views/toast.html').then(function (data) {
                _$toast = $(data);
                $(document.body).append(_$toast);
                $compile(_$toast)(_toastScope);
            });
        }
        var key = +new Date();
        _toastScope.list.unshift({word: word, _key_: key});
        $timeout(function () {
            _toastScope.list.splice(_toastScope.list.indexOf(_.find(_toastScope.list, function (value) {
                return value._key_ === key;
            })), 1);
            def.resolve({});
        }, time || 4000);

        return def.promise;
    };

    var _$progress = null;
    var _progressScope = $rootScope.$new();
    _progressScope.show = false;
    var progress = {
        start: function () {
            if (!_$progress) {
                _$progress = true;
                $templateRequest('views/progress.html').then(function (data) {
                    _$progress = $(data);
                    $(document.body).append(_$progress);
                    $compile(_$progress)(_progressScope);
                });
            }
            _progressScope.show = true;
        },
        done: function () {
            _progressScope.show = false;
        }
    };


    var scroll = {
        set: function (value) {
            var _content = $('.site-content')[0];
            _content.scrollTop = value;
        },
        top: function () {
            scroll.set(0);
        },
        bottom: function () {
            scroll.set($('.site-content>div:first').height());
        },
        page: function () {
            scroll.set(document.body.scrollTop + document.documentElement.clientHeight);
        }
    };

    var format = function (str, data) {
        var result = str;
        if (arguments.length < 2) {
            return result;
        }

        result = result.replace(/\{([\d\w\.]+)\}/g, function (key) {
            var keys = arguments[1].split('.');
            var r = null;
            _.each(keys, function (value, index) {
                if (index) {
                    r = r[value];
                } else {
                    r = data[value];
                }
            });
            return r;
        });
        return result;
    };

    var time = {
        str2date: function (dateStr) {
            var d = dateStr.replace(/[-/:]/g, ' ').split(' ');
            //具体到s
            return new Date(d[0], (d[1] - 1), d[2], (d[3] || 0), (d[4] || 0), (d[5] || 0), (d[6] || 0));
        }
    };

    var _userInfo = null;
    var userInfo = {
        set: function (info) {
            _userInfo = info;
        },
        get: function () {
            return _userInfo;
        }
    };


    var ZL = {
        alert: alert,
        confirm: confirm,
        prompt: prompt,
        tips: toast,
        progress: progress,
        scroll: scroll,
        format: format,
        sha256: $zlSha256,
        userInfo: userInfo,
        time: time
    };

    // 虽然暴漏给外面。 但是涉及到ng的生命周期的都不能载控制台来调用。
    window.ZL = ZL;

    return ZL;
}]);
angular.module('ng.zl.pick').factory('$zlPickService', ["$q", "$log", "$zl", function ($q, $log, $zl) {
    'use strict';

    var baseUrl = '/admin/';

    function post(url, params) {
        var def = $q.defer();
        $.ajax({
            url: url[0] === '/' ? url : (baseUrl + url),
            type: 'post',
            data: params,
            dataType: 'json',
            success: function (data) {
                def.resolve(data);
            },
            error: function () {
                def.reject('服务器错误');
            }
        });
        return processPromise(def.promise);
    }

    function processPromise(promise) {
        // 处理http
        return promise.then(function (data) {
            if (data.errorCode === 0 || data.errorCode === 200) {
                return data.response || {}; // 兼容
            } else {
                return $q.reject((data.errorDescription || '未知错误') + '  errorCode:' + data.errorCode + '  version:' + data.version);
            }
        }, function (reason) {
            return $q.reject(reason);
        }).then(function (data) {
            return data;
        }, function (reason) {
            // 错误提示
            $zl.tips(reason);
            return $q.reject(reason);
        });
    }

    var dataService = {};

    // region
    dataService.getProvinceByWord = function (params) {
        return post('/region/listRegionByKeyword', _.extend(params, {
            scope: 1
        }));
    };
    dataService.getCityByWord = function (params) {
        return post('/region/listRegionByKeyword', _.extend(params, {
            scope: 2
        }));
    };
    dataService.getAreaByWord = function (params) {
        return post('/region/listRegionByKeyword', _.extend(params, {
            scope: 3
        }));
    };
    // address
    dataService.getCommunityByWord = function (params) {
        return post('/address/searchCommunities', params);
    };
    dataService.getBuildingByWord = function (params) {
        return post('/address/listBuildingsByKeyword', params);
    };
    dataService.getApartmentByWord = function (params) {
        return post('/address/listApartmentsByKeyword', params);
    };

    // 在封装一层，打印交出去的数据
    // 同时把params复制一份，避免干扰之前的数据

    var packDataService = {};
    _.each(dataService, function (value, key) {
        packDataService[key] = function (params) {
            return value.apply(this, [angular.copy(params)]).then(function (data) {
                //$log.info('data.service info: ' + key);
                //$log.info(data);
                return angular.copy(data);
            });
        };
    });

    return packDataService;
}]);
angular.module('ng.zl.sha256', []).factory('$zlSha256', function () {
    'use strict';
    var sha256 = function (str) {
        function rotateRight(n, x) {
            return ((x >>> n) | (x << (32 - n)));
        }

        function choice(x, y, z) {
            return ((x & y) ^ (~x & z));
        }

        function majority(x, y, z) {
            return ((x & y) ^ (x & z) ^ (y & z));
        }

        function sha256_Sigma0(x) {
            return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
        }

        function sha256_Sigma1(x) {
            return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
        }

        function sha256_sigma0(x) {
            return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
        }

        function sha256_sigma1(x) {
            return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
        }

        function sha256_expand(W, j) {
            return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
                sha256_sigma0(W[(j + 1) & 0x0f]));
        }

        /* Hash constant words K: */
        var K256 = new Array(
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        );

        /* global arrays */
        var ihash, count, buffer;
        var sha256_hex_digits = "0123456789abcdef";

        /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
         overflow) */
        function safe_add(x, y) {
            var lsw = (x & 0xffff) + (y & 0xffff);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xffff);
        }

        /* Initialise the SHA256 computation */
        function sha256_init() {
            ihash = new Array(8);
            count = new Array(2);
            buffer = new Array(64);
            count[0] = count[1] = 0;
            ihash[0] = 0x6a09e667;
            ihash[1] = 0xbb67ae85;
            ihash[2] = 0x3c6ef372;
            ihash[3] = 0xa54ff53a;
            ihash[4] = 0x510e527f;
            ihash[5] = 0x9b05688c;
            ihash[6] = 0x1f83d9ab;
            ihash[7] = 0x5be0cd19;
        }


        /* Transform a 512-bit message block */
        function sha256_transform() {
            var a, b, c, d, e, f, g, h, T1, T2;
            var W = new Array(16);

            /* Initialize registers with the previous intermediate value */
            a = ihash[0];
            b = ihash[1];
            c = ihash[2];
            d = ihash[3];
            e = ihash[4];
            f = ihash[5];
            g = ihash[6];
            h = ihash[7];

            /* make 32-bit words */
            for (var i = 0; i < 16; i++)
                W[i] = ((buffer[(i << 2) + 3]) | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1] << 16) | (buffer[i << 2] << 24));

            for (var j = 0; j < 64; j++) {
                T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
                if (j < 16) T1 += W[j];
                else T1 += sha256_expand(W, j);
                T2 = sha256_Sigma0(a) + majority(a, b, c);
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            /* Compute the current intermediate hash value */
            ihash[0] += a;
            ihash[1] += b;
            ihash[2] += c;
            ihash[3] += d;
            ihash[4] += e;
            ihash[5] += f;
            ihash[6] += g;
            ihash[7] += h;
        }

        /* Read the next chunk of data and update the SHA256 computation */
        function sha256_update(data, inputLen) {
            var i, index, curpos = 0;
            /* Compute number of bytes mod 64 */
            index = ((count[0] >> 3) & 0x3f);
            var remainder = (inputLen & 0x3f);

            /* Update number of bits */
            if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
            count[1] += (inputLen >> 29);

            /* Transform as many times as possible */
            for (i = 0; i + 63 < inputLen; i += 64) {
                for (var j = index; j < 64; j++)
                    buffer[j] = data.charCodeAt(curpos++);
                sha256_transform();
                index = 0;
            }

            /* Buffer remaining input */
            for (var j = 0; j < remainder; j++)
                buffer[j] = data.charCodeAt(curpos++);
        }

        /* Finish the computation by operations such as padding */
        function sha256_final() {
            var index = ((count[0] >> 3) & 0x3f);
            buffer[index++] = 0x80;
            if (index <= 56) {
                for (var i = index; i < 56; i++)
                    buffer[i] = 0;
            } else {
                for (var i = index; i < 64; i++)
                    buffer[i] = 0;
                sha256_transform();
                for (var i = 0; i < 56; i++)
                    buffer[i] = 0;
            }
            buffer[56] = (count[1] >>> 24) & 0xff;
            buffer[57] = (count[1] >>> 16) & 0xff;
            buffer[58] = (count[1] >>> 8) & 0xff;
            buffer[59] = count[1] & 0xff;
            buffer[60] = (count[0] >>> 24) & 0xff;
            buffer[61] = (count[0] >>> 16) & 0xff;
            buffer[62] = (count[0] >>> 8) & 0xff;
            buffer[63] = count[0] & 0xff;
            sha256_transform();
        }

        /* Split the internal hash values into an array of bytes */
        function sha256_encode_bytes() {
            var j = 0;
            var output = new Array(32);
            for (var i = 0; i < 8; i++) {
                output[j++] = ((ihash[i] >>> 24) & 0xff);
                output[j++] = ((ihash[i] >>> 16) & 0xff);
                output[j++] = ((ihash[i] >>> 8) & 0xff);
                output[j++] = (ihash[i] & 0xff);
            }
            return output;
        }

        /* Get the internal hash as a hex string */
        function sha256_encode_hex() {
            var output = new String();
            for (var i = 0; i < 8; i++) {
                for (var j = 28; j >= 0; j -= 4)
                    output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
            }
            return output;
        }

        /* Main function: returns a hex string representing the SHA256 value of the
         given data */
        function sha256_digest(data) {
            sha256_init();
            sha256_update(data, data.length);
            sha256_final();
            return sha256_encode_hex();
        }

        /* test if the JS-interpreter is working properly */
        function sha256_self_test() {
            return sha256_digest("message digest") ==
                "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
        }

        return sha256_digest(str);
    };
    return sha256;
});
angular.module('ng.zl.uploader', []).service('$zlUploader', ["$log", "$q", function ($log, $q) {
    'use strict';

    // 不能采用 promise 的形式， 因为会有多次上传。 而promise 只一次
    var files = [];

    var Upload = function (container, config) {
        var def = $q.defer();

        var $container = $(container);
        var _config = $.extend({
            //width: 82,
            height: 37,
            buttonText: '上传',
            buttonClass: 'zl-btn-upload',
            removeCompleted: true
            //onUploadComplete: function (file, data) {
            //    data = angular.fromJson(data);
            //    if (data.errorCode === 200) {
            //        def.resolve(file);
            //    }else{
            //        def.reject(data.errorDescription || '未知错误');
            //    }
            //}
        }, config);

        if ($container[0].id === '') {
            throw('container id ?');
        } else if (_config.url) {
            throw(' url ?');
        } else {
            $container.uploadifive(_config);
        }

        return def.promise;
    };


    var fileUpload = function(container, config) {
        config = $.extend({
            fileObjName: 'attachment',
            buttonText: '上传文件',
            multi: false
        }, config);

        return Upload(container, config);
    };
    
    var imgUpload = function (container, config) {
        config = $.extend({
            fileObjName: 'resFiles',
            buttonText: '上传图片',
            multi: false
        }, config);
        return Upload(container, config);
    };

    return {
        fileUpload: fileUpload,
        imgUpload: imgUpload
    };
}]);
/*
UploadiFive 1.2.2
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the UploadiFive Standard License <http://www.uploadify.com/uploadifive-standard-license>
*/
;(function($) {

    var methods = {

        init : function(options) {
            
            return this.each(function() {

                // Create a reference to the jQuery DOM object
                var $this = $(this);
                    $this.data('uploadifive', {
                        inputs     : {}, // The object that contains all the file inputs
                        inputCount : 0,  // The total number of file inputs created
                        fileID     : 0,
                        queue      : {
                                         count      : 0, // Total number of files in the queue
                                         selected   : 0, // Number of files selected in the last select operation
                                         replaced   : 0, // Number of files replaced in the last select operation
                                         errors     : 0, // Number of files that returned an error in the last select operation
                                         queued     : 0, // Number of files added to the queue in the last select operation
                                         cancelled  : 0  // Total number of files that have been cancelled or removed from the queue
                                     },
                        uploads    : {
                                         current    : 0, // Number of files currently being uploaded
                                         attempts   : 0, // Number of file uploads attempted in the last upload operation
                                         successful : 0, // Number of files successfully uploaded in the last upload operation
                                         errors     : 0, // Number of files returning errors in the last upload operation
                                         count      : 0  // Total number of files uploaded successfully
                                     }
                    });
                var $data = $this.data('uploadifive');

                // Set the default options
                var settings = $data.settings = $.extend({
                    'auto'            : true,               // Automatically upload a file when it's added to the queue
                    'buttonClass'     : false,              // A class to add to the UploadiFive button
                    'buttonText'      : 'Select Files',     // The text that appears on the UploadiFive button
                    'checkScript'     : false,              // Path to the script that checks for existing file names 
                    'dnd'             : true,               // Allow drag and drop into the queue
                    'dropTarget'      : false,              // Selector for the drop target
                    'fileObjName'     : 'Filedata',         // The name of the file object to use in your server-side script
                    'fileSizeLimit'   : 0,                  // Maximum allowed size of files to upload
                    'fileType'        : false,              // Type of files allowed (image, etc), separate with a pipe character |
                    'formData'        : {},                 // Additional data to send to the upload script
                    'height'          : 30,                 // The height of the button
                    'itemTemplate'    : false,              // The HTML markup for the item in the queue
                    'method'          : 'post',             // The method to use when submitting the upload
                    'multi'           : true,               // Set to true to allow multiple file selections
                    'overrideEvents'  : [],                 // An array of events to override
                    'queueID'         : false,              // The ID of the file queue
                    'queueSizeLimit'  : 0,                  // The maximum number of files that can be in the queue
                    'removeCompleted' : false,              // Set to true to remove files that have completed uploading
                    'simUploadLimit'  : 0,                  // The maximum number of files to upload at once
                    'truncateLength'  : 0,                  // The length to truncate the file names to
                    'uploadLimit'     : 0,                  // The maximum number of files you can upload
                    'uploadScript'    : 'uploadifive.php',  // The path to the upload script
                    'width'           : 100                 // The width of the button

                    /*
                    // Events
                    'onAddQueueItem'   : function(file) {},                        // Triggered for each file that is added to the queue
                    'onCancel'         : function(file) {},                        // Triggered when a file is cancelled or removed from the queue
                    'onCheck'          : function(file, exists) {},                // Triggered when the server is checked for an existing file
                    'onClearQueue'     : function(queue) {},                       // Triggered during the clearQueue function
                    'onDestroy'        : function() {}                             // Triggered during the destroy function
                    'onDrop'           : function(files, numberOfFilesDropped) {}, // Triggered when files are dropped into the file queue
                    'onError'          : function(file, fileType, data) {},        // Triggered when an error occurs
                    'onFallback'       : function() {},                            // Triggered if the HTML5 File API is not supported by the browser
                    'onInit'           : function() {},                            // Triggered when UploadiFive if initialized
                    'onQueueComplete'  : function() {},                            // Triggered once when an upload queue is done
                    'onProgress'       : function(file, event) {},                 // Triggered during each progress update of an upload
                    'onSelect'         : function() {},                            // Triggered once when files are selected from a dialog box
                    'onUpload'         : function(file) {},                        // Triggered when an upload queue is started
                    'onUploadComplete' : function(file, data) {},                  // Triggered when a file is successfully uploaded
                    'onUploadFile'     : function(file) {},                        // Triggered for each file being uploaded
                    */
                }, options);

                // Calculate the file size limit
                if (isNaN(settings.fileSizeLimit)) {
                    var fileSizeLimitBytes = parseInt(settings.fileSizeLimit) * 1.024
                    if (settings.fileSizeLimit.indexOf('KB') > -1) {
                        settings.fileSizeLimit = fileSizeLimitBytes * 1000;
                    } else if (settings.fileSizeLimit.indexOf('MB') > -1) {
                        settings.fileSizeLimit = fileSizeLimitBytes * 1000000;
                    } else if (settings.fileSizeLimit.indexOf('GB') > -1) {
                        settings.fileSizeLimit = fileSizeLimitBytes * 1000000000;
                    }
                } else {
                    settings.fileSizeLimit = settings.fileSizeLimit * 1024;
                }

                // Create a template for a file input
                $data.inputTemplate = $('<input type="file">')
                .css({
                    'font-size' : settings.height + 'px',
                    'opacity'   : 0,
                    'position'  : 'absolute',
                    'right'     : '-3px',
                    'top'       : '-3px',
                    'z-index'   : 999 
                });

                // Create a new input
                $data.createInput = function() {

                    // Create a clone of the file input
                    var input     = $data.inputTemplate.clone();
                    // Create a unique name for the input item
                    var inputName = input.name = 'input' + $data.inputCount++;
                    // Set the multiple attribute
                    if (settings.multi) {
                        input.attr('multiple', true);
                    }
                    // Set the accept attribute on the input
                    if (settings.fileType) {
                        input.attr('accept', settings.fileType);
                    }
                    // Set the onchange event for the input
                    input.bind('change', function() {
                        $data.queue.selected = 0;
                        $data.queue.replaced = 0;
                        $data.queue.errors   = 0;
                        $data.queue.queued   = 0;
                        // Add a queue item to the queue for each file
                        var limit = this.files.length;
                        $data.queue.selected = limit;
                        if (($data.queue.count + limit) > settings.queueSizeLimit && settings.queueSizeLimit !== 0) {
                            if ($.inArray('onError', settings.overrideEvents) < 0) {
                                alert('The maximum number of queue items has been reached (' + settings.queueSizeLimit + ').  Please select fewer files.');
                            }
                            // Trigger the error event
                            if (typeof settings.onError === 'function') {
                                settings.onError.call($this, 'QUEUE_LIMIT_EXCEEDED');
                            }
                        } else {
                            for (var n = 0; n < limit; n++) {
                                file = this.files[n];
                                $data.addQueueItem(file);
                            }
                            $data.inputs[inputName] = this;
                            $data.createInput();
                        }
                        // Upload the file if auto-uploads are enabled
                        if (settings.auto) {
                            methods.upload.call($this);
                        }
                        // Trigger the select event
                        if (typeof settings.onSelect === 'function') {
                            settings.onSelect.call($this, $data.queue);
                        }
                    });
                    // Hide the existing current item and add the new one
                    if ($data.currentInput) {
                        $data.currentInput.hide();
                    }
                    $data.button.append(input);
                    $data.currentInput = input;
                }

                // Remove an input
                $data.destroyInput = function(key) {
                    $($data.inputs[key]).remove();
                    delete $data.inputs[key];
                    $data.inputCount--;
                }

                // Drop a file into the queue
                $data.drop = function(e) {
                    $data.queue.selected = 0;
                    $data.queue.replaced = 0;
                    $data.queue.errors   = 0;
                    $data.queue.queued   = 0;

                    var fileData = e.dataTransfer;

                    var inputName = fileData.name = 'input' + $data.inputCount++;
                    // Add a queue item to the queue for each file
                    var limit = fileData.files.length;
                    $data.queue.selected = limit;
                    if (($data.queue.count + limit) > settings.queueSizeLimit && settings.queueSizeLimit !== 0) {
                        // Check if the queueSizeLimit was reached
                        if ($.inArray('onError', settings.overrideEvents) < 0) {
                            alert('The maximum number of queue items has been reached (' + settings.queueSizeLimit + ').  Please select fewer files.');
                        }
                        // Trigger the onError event
                        if (typeof settings.onError === 'function') {
                            settings.onError.call($this, 'QUEUE_LIMIT_EXCEEDED');
                        }
                    } else {
                        // Add a queue item for each file
                        for (var n = 0; n < limit; n++) {
                            file = fileData.files[n];
                            $data.addQueueItem(file);
                        }
                        // Save the data to the inputs object
                        $data.inputs[inputName] = fileData;
                    }

                    // Upload the file if auto-uploads are enabled
                    if (settings.auto) {
                        methods.upload.call($this);
                    }

                    // Trigger the onDrop event
                    if (typeof settings.onDrop === 'function') {
                        settings.onDrop.call($this, fileData.files, fileData.files.length);
                    }

                    // Stop FireFox from opening the dropped file(s)
                    e.preventDefault();
                    e.stopPropagation();
                }

                // Check if a filename exists in the queue
                $data.fileExistsInQueue = function(file) {
                    for (var key in $data.inputs) {
                        input = $data.inputs[key];
                        limit = input.files.length;
                        for (var n = 0; n < limit; n++) {
                            existingFile = input.files[n];
                            // Check if the filename matches
                            if (existingFile.name == file.name && !existingFile.complete) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                // Remove an existing file in the queue
                $data.removeExistingFile = function(file) {
                    for (var key in $data.inputs) {
                        input = $data.inputs[key];
                        limit = input.files.length;
                        for (var n = 0; n < limit; n++) {
                            existingFile = input.files[n];
                            // Check if the filename matches
                            if (existingFile.name == file.name && !existingFile.complete) {
                                $data.queue.replaced++;
                                methods.cancel.call($this, existingFile, true);
                            }
                        }
                    }
                }

                // Create the file item template
                if (settings.itemTemplate == false) {
                    $data.queueItem = $('<div class="uploadifive-queue-item">\
                        <a class="close" href="#">X</a>\
                        <div><span class="filename"></span><span class="fileinfo"></span></div>\
                        <div class="progress">\
                            <div class="progress-bar"></div>\
                        </div>\
                    </div>');
                } else {
                    $data.queueItem = $(settings.itemTemplate);
                }

                // Add an item to the queue
                $data.addQueueItem = function(file) {
                    if ($.inArray('onAddQueueItem', settings.overrideEvents) < 0) {
                        // Check if the filename already exists in the queue
                        $data.removeExistingFile(file);
                        // Create a clone of the queue item template
                        file.queueItem = $data.queueItem.clone();
                        // Add an ID to the queue item
                        file.queueItem.attr('id', settings.id + '-file-' + $data.fileID++);
                        // Bind the close event to the close button
                        file.queueItem.find('.close').bind('click', function() {
                           methods.cancel.call($this, file);
                           return false;
                        });
                        var fileName = file.name;
                        if (fileName.length > settings.truncateLength && settings.truncateLength != 0) {
                            fileName = fileName.substring(0, settings.truncateLength) + '...';
                        }
                        file.queueItem.find('.filename').html(fileName);
                        // Add a reference to the file
                        file.queueItem.data('file', file);
                        $data.queueEl.append(file.queueItem);
                    }
                    // Trigger the addQueueItem event
                    if (typeof settings.onAddQueueItem === 'function') {
                        settings.onAddQueueItem.call($this, file);
                    }
                    // Check the filesize
                    if (file.size > settings.fileSizeLimit && settings.fileSizeLimit != 0) {
                        $data.error('FILE_SIZE_LIMIT_EXCEEDED', file);
                    } else {
                        $data.queue.queued++;
                        $data.queue.count++;
                    }
                }

                // Remove an item from the queue
                $data.removeQueueItem = function(file, instant, delay) {
                    // Set the default delay
                    if (!delay) delay = 0;
                    var fadeTime = instant ? 0 : 500;
                    if (file.queueItem) {
                        if (file.queueItem.find('.fileinfo').html() != ' - Completed') {
                            file.queueItem.find('.fileinfo').html(' - Cancelled');
                        }
                        file.queueItem.find('.progress-bar').width(0);
                        file.queueItem.delay(delay).fadeOut(fadeTime, function() {
                           $(this).remove();
                        });
                        delete file.queueItem;
                        $data.queue.count--;
                    }
                }

                // Count the number of files that need to be uploaded
                $data.filesToUpload = function() {
                    var filesToUpload = 0;
                    for (var key in $data.inputs) {
                        input = $data.inputs[key];
                        limit = input.files.length;
                        for (var n = 0; n < limit; n++) {
                            file = input.files[n];
                            if (!file.skip && !file.complete) {
                                filesToUpload++;
                            }
                        }
                    }
                    return filesToUpload;
                }

                // Check if a file exists
                $data.checkExists = function(file) {
                    if ($.inArray('onCheck', settings.overrideEvents) < 0) {
                        // This request needs to be synchronous
                        $.ajaxSetup({
                            'async' : false
                        });
                        // Send the filename to the check script
                        var checkData = $.extend(settings.formData, {filename: file.name});
                        $.post(settings.checkScript, checkData, function(fileExists) {
                            file.exists = parseInt(fileExists);
                        });
                        if (file.exists) {
                            if (!confirm('A file named ' + file.name + ' already exists in the upload folder.\nWould you like to replace it?')) {
                                // If not replacing the file, cancel the upload
                                methods.cancel.call($this, file);
                                return true;
                            }
                        }
                    }
                    // Trigger the check event
                    if (typeof settings.onCheck === 'function') {
                        settings.onCheck.call($this, file, file.exists);
                    }
                    return false;
                }

                // Upload a single file
                $data.uploadFile = function(file, uploadAll) {
                    if (!file.skip && !file.complete && !file.uploading) {
                        file.uploading = true;
                        $data.uploads.current++;
                        $data.uploads.attempted++;

                        // Create a new AJAX request
                        xhr = file.xhr = new XMLHttpRequest();

                        // Start the upload
                        // Use the faster FormData if it exists
                        if (typeof FormData === 'function' || typeof FormData === 'object') {

                            // Create a new FormData object
                            var formData = new FormData();

                            // Add the form data
                            formData.append(settings.fileObjName, file);

                            // Add the rest of the formData
                            for (i in settings.formData) {
                                formData.append(i, settings.formData[i]);
                            }

                            // Open the AJAX call
                            xhr.open(settings.method, settings.uploadScript, true);

                            // On progress function
                            xhr.upload.addEventListener('progress', function(e) {
                                if (e.lengthComputable) {
                                    $data.progress(e, file);
                                }
                            }, false);

                            // On complete function
                            xhr.addEventListener('load', function(e) {
                                if (this.readyState == 4) {
                                    file.uploading = false;
                                    if (this.status == 200) {
                                        if (file.xhr.responseText !== 'Invalid file type.') {
                                            $data.uploadComplete(e, file, uploadAll);
                                        } else {
                                            $data.error(file.xhr.responseText, file, uploadAll);
                                        }
                                    } else if (this.status == 404) {
                                        $data.error('404_FILE_NOT_FOUND', file, uploadAll);
                                    } else if (this.status == 403) {
                                        $data.error('403_FORBIDDEN', file, uploadAll);
                                    } else {
                                        $data.error('Unknown Error', file, uploadAll);
                                    }
                                }
                            });

                            // Send the form data (multipart/form-data)
                            xhr.send(formData);

                        } else {

                            // Send as binary
                            var reader = new FileReader();
                            reader.onload = function(e) {

                                // Set some file builder variables
                                var boundary = '-------------------------' + (new Date).getTime(),
                                    dashes   = '--',
                                    eol      = '\r\n',
                                    binFile  = '';

                                // Build an RFC2388 String 
                                binFile += dashes + boundary + eol;
                                // Generate the headers
                                binFile += 'Content-Disposition: form-data; name="' + settings.fileObjName + '"';
                                if (file.name) {
                                    binFile += '; filename="' + file.name + '"';
                                }
                                binFile += eol;
                                binFile += 'Content-Type: application/octet-stream' + eol + eol;
                                binFile += e.target.result + eol;

                                for (key in settings.formData) {
                                    binFile += dashes + boundary + eol;
                                    binFile += 'Content-Disposition: form-data; name="' + key + '"' + eol + eol;
                                    binFile += settings.formData[key] + eol;
                                }

                                binFile += dashes + boundary + dashes + eol;

                                // On progress function
                                xhr.upload.addEventListener('progress', function(e) {
                                    $data.progress(e, file);
                                }, false);

                                // On complete function
                                xhr.addEventListener('load', function(e) {
                                    file.uploading = false;
                                    var status = this.status;
                                    if (status == 404) {
                                        $data.error('404_FILE_NOT_FOUND', file, uploadAll);
                                    } else {
                                        if (file.xhr.responseText != 'Invalid file type.') {    
                                            $data.uploadComplete(e, file, uploadAll);
                                        } else {
                                            $data.error(file.xhr.responseText, file, uploadAll);
                                        } 
                                    }
                                }, false);

                                // Open the ajax request
                                var url = settings.uploadScript;
                                if (settings.method == 'get') {
                                    var params = $(settings.formData).param();
                                    url += params;
                                }
                                xhr.open(settings.method, settings.uploadScript, true);
                                xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);

                                // Trigger the uploadFile event
                                if (typeof settings.onUploadFile === 'function') {
                                    settings.onUploadFile.call($this, file);
                                }

                                // Send the file for upload
                                xhr.sendAsBinary(binFile);
                            }
                            reader.readAsBinaryString(file);

                        }
                    }
                }

                // Update a file upload's progress
                $data.progress = function(e, file) {
                    if ($.inArray('onProgress', settings.overrideEvents) < 0) {
                        if (e.lengthComputable) {
                            var percent = Math.round((e.loaded / e.total) * 100);
                        }
                        file.queueItem.find('.fileinfo').html(' - ' + percent + '%');
                        file.queueItem.find('.progress-bar').css('width', percent + '%');
                    }
                    // Trigger the progress event
                    if (typeof settings.onProgress === 'function') {
                        settings.onProgress.call($this, file, e);
                    }
                }

                // Trigger an error
                $data.error = function(errorType, file, uploadAll) {
                    if ($.inArray('onError', settings.overrideEvents) < 0) {
                        // Get the error message
                        switch(errorType) {
                            case '404_FILE_NOT_FOUND':
                                errorMsg = '404 Error';
                                break;
                            case '403_FORBIDDEN':
                                errorMsg = '403 Forbidden';
                                break;
                            case 'FORBIDDEN_FILE_TYPE':
                                errorMsg = 'Forbidden File Type';
                                break;
                            case 'FILE_SIZE_LIMIT_EXCEEDED':
                                errorMsg = 'File Too Large';
                                break;
                            default:
                                errorMsg = 'Unknown Error';
                                break;
                        }

                        // Add the error class to the queue item
                        file.queueItem.addClass('error')
                        // Output the error in the queue item
                        .find('.fileinfo').html(' - ' + errorMsg);
                        // Hide the 
                        file.queueItem.find('.progress').remove();
                    }
                    // Trigger the error event
                    if (typeof settings.onError === 'function') {
                        settings.onError.call($this, errorType, file);
                    }
                    file.skip = true;
                    if (errorType == '404_FILE_NOT_FOUND') {
                        $data.uploads.errors++;
                    } else {
                        $data.queue.errors++;
                    }
                    if (uploadAll) {
                        methods.upload.call($this, null, true);
                    }
                }

                // Trigger when a single file upload is complete
                $data.uploadComplete = function(e, file, uploadAll) {
                    if ($.inArray('onUploadComplete', settings.overrideEvents) < 0) {
                        file.queueItem.find('.progress-bar').css('width', '100%');
                        file.queueItem.find('.fileinfo').html(' - Completed');
                        file.queueItem.find('.progress').slideUp(250);
                        file.queueItem.addClass('complete');
                    }
                    // Trigger the complete event
                    if (typeof settings.onUploadComplete === 'function') {
                        settings.onUploadComplete.call($this, file, file.xhr.responseText);
                    }
                    if (settings.removeCompleted) {
                        setTimeout(function() { methods.cancel.call($this, file); }, 3000);
                    }
                    file.complete = true;
                    $data.uploads.successful++;
                    $data.uploads.count++;
                    $data.uploads.current--;
                    delete file.xhr;
                    if (uploadAll) {
                        methods.upload.call($this, null, true);
                    }
                }

                // Trigger when all the files are done uploading
                $data.queueComplete = function() {
                    // Trigger the queueComplete event
                    if (typeof settings.onQueueComplete === 'function') {
                        settings.onQueueComplete.call($this, $data.uploads);
                    }
                }

                // ----------------------
                // Initialize UploadiFive
                // ----------------------

                // Check if HTML5 is available
                if (window.File && window.FileList && window.Blob && (window.FileReader || window.FormData)) {
                    // Assign an ID to the object
                    settings.id = 'uploadifive-' + $this.attr('id');

                    // Wrap the file input in a div with overflow set to hidden
                    $data.button = $('<div id="' + settings.id + '" class="uploadifive-button">' + settings.buttonText + '</div>');
                    if (settings.buttonClass) $data.button.addClass(settings.buttonClass);

                    // Style the button wrapper
                    $data.button.css({
                        'height'      : settings.height,
                        'line-height' : settings.height + 'px', 
                        'overflow'    : 'hidden',
                        'position'    : 'relative',
                        'text-align'  : 'center', 
                        'width'       : settings.width
                    });

                    // Insert the button above the file input
                    $this.before($data.button)
                    // Add the file input to the button
                    .appendTo($data.button)
                    // Modify the styles of the file input
                    .hide();

                    // Create a new input
                    $data.createInput.call($this);

                    // Create the queue container
                    if (!settings.queueID) {
                        settings.queueID = settings.id + '-queue';
                        $data.queueEl = $('<div id="' + settings.queueID + '" class="uploadifive-queue" />');
                        $data.button.after($data.queueEl);
                    } else {
                        $data.queueEl = $('#' + settings.queueID);
                    }

                    // Add drag and drop functionality
                    if (settings.dnd) {
                        var $dropTarget = settings.dropTarget ? $(settings.dropTarget) : $data.queueEl.get(0);
                        $dropTarget.addEventListener('dragleave', function(e) {
                            // Stop FireFox from opening the dropped file(s)
                            e.preventDefault();
                            e.stopPropagation();
                        }, false);
                        $dropTarget.addEventListener('dragenter', function(e) {
                            // Stop FireFox from opening the dropped file(s)
                            e.preventDefault();
                            e.stopPropagation();
                        }, false);
                        $dropTarget.addEventListener('dragover', function(e) {
                            // Stop FireFox from opening the dropped file(s)
                            e.preventDefault();
                            e.stopPropagation();
                        }, false);
                        $dropTarget.addEventListener('drop', $data.drop, false);
                    }

                    // Send as binary workaround for Chrome
                    if (!XMLHttpRequest.prototype.sendAsBinary) {
                        XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
                            function byteValue(x) {
                                return x.charCodeAt(0) & 0xff;
                            }
                            var ords = Array.prototype.map.call(datastr, byteValue);
                            var ui8a = new Uint8Array(ords);
                            this.send(ui8a.buffer);
                        }
                    }

                    // Trigger the oninit event
                    if (typeof settings.onInit === 'function') {
                        settings.onInit.call($this);
                    }

                } else {

                    // Trigger the fallback event
                    if (typeof settings.onFallback === 'function') {
                        settings.onFallback.call($this);
                    }
                    return false;

                }

            });

        },


        // Write some data to the console
        debug : function() {

            return this.each(function() {

                console.log($(this).data('uploadifive'));

            });

        },

        // Clear all the items from the queue
        clearQueue : function() {

            this.each(function() {

                var $this    = $(this),
                    $data    = $this.data('uploadifive'),
                    settings = $data.settings;

                for (var key in $data.inputs) {
                    input = $data.inputs[key];
                    limit = input.files.length;
                    for (i = 0; i < limit; i++) {
                        file = input.files[i];
                        methods.cancel.call($this, file);
                    }
                }
                // Trigger the onClearQueue event
                if (typeof settings.onClearQueue === 'function') {
                    settings.onClearQueue.call($this, $('#' + $data.settings.queueID));
                }

            });

        },

        // Cancel a file upload in progress or remove a file from the queue
        cancel : function(file, fast) {

            this.each(function() {

                var $this    = $(this),
                    $data    = $this.data('uploadifive'),
                    settings = $data.settings;

                // If user passed a queue item ID instead of file...
                if (typeof file === 'string') {
                    if (!isNaN(file)) {
                        fileID = 'uploadifive-' + $(this).attr('id') + '-file-' + file;
                    }
                    file = $('#' + fileID).data('file');
                }

                file.skip = true;
                $data.filesCancelled++;
                if (file.uploading) {
                    $data.uploads.current--;
                    file.uploading = false;
                    file.xhr.abort();
                    delete file.xhr;
                    methods.upload.call($this);
                }
                if ($.inArray('onCancel', settings.overrideEvents) < 0) {
                    $data.removeQueueItem(file, fast);
                }

                // Trigger the cancel event
                if (typeof settings.onCancel === 'function') {
                    settings.onCancel.call($this, file);
                }
                
            });
            
        },

        // Upload the files in the queue
        upload : function(file, keepVars) {

            this.each(function() {

                var $this    = $(this),
                    $data    = $this.data('uploadifive'),
                    settings = $data.settings;

                if (file) {

                    $data.uploadFile.call($this, file);

                } else {

                    // Check if the upload limit was reached
                    if (($data.uploads.count + $data.uploads.current) < settings.uploadLimit || settings.uploadLimit == 0) {
                        if (!keepVars) {
                            $data.uploads.attempted   = 0;
                            $data.uploads.successsful = 0;
                            $data.uploads.errors      = 0;
                            var filesToUpload = $data.filesToUpload();
                            // Trigger the onUpload event
                            if (typeof settings.onUpload === 'function') {
                                settings.onUpload.call($this, filesToUpload);
                            }
                        }

                        // Loop through the files
                        $('#' + settings.queueID).find('.uploadifive-queue-item').not('.error, .complete').each(function() {
                            _file = $(this).data('file');
                            // Check if the simUpload limit was reached
                            if (($data.uploads.current >= settings.simUploadLimit && settings.simUploadLimit !== 0) || ($data.uploads.current >= settings.uploadLimit && settings.uploadLimit !== 0) || ($data.uploads.count >= settings.uploadLimit && settings.uploadLimit !== 0)) {
                                return false;
                            }
                            if (settings.checkScript) {
                                // Let the loop know that we're already processing this file
                                _file.checking = true;
                                skipFile = $data.checkExists(_file);
                                _file.checking = false;
                                if (!skipFile) {
                                    $data.uploadFile(_file, true);
                                }
                            } else {
                                $data.uploadFile(_file, true);
                            }
                        });
                        if ($('#' + settings.queueID).find('.uploadifive-queue-item').not('.error, .complete').size() == 0) {
                            $data.queueComplete();
                        }
                    } else {
                        if ($data.uploads.current == 0) {
                            if ($.inArray('onError', settings.overrideEvents) < 0) {
                                if ($data.filesToUpload() > 0 && settings.uploadLimit != 0) {
                                    alert('The maximum upload limit has been reached.');
                                }
                            }
                            // Trigger the onError event
                            if (typeof settings.onError === 'function') {
                                settings.onError.call($this, 'UPLOAD_LIMIT_EXCEEDED', $data.filesToUpload());
                            }
                        }
                    }

                }

            });

        },

        // Destroy an instance of UploadiFive
        destroy : function() {

            this.each(function() {

                var $this    = $(this),
                    $data    = $this.data('uploadifive'),
                    settings = $data.settings;
            
                // Clear the queue
                methods.clearQueue.call($this);
                // Destroy the queue if it was created
                if (!settings.queueID) $('#' + settings.queueID).remove();
                // Remove extra inputs
                $this.siblings('input').remove();
                // Show the original file input
                $this.show()
                // Move the file input out of the button
                .insertBefore($data.button);
                // Delete the button
                $data.button.remove();
                // Trigger the destroy event
                if (typeof settings.onDestroy === 'function') {
                    settings.onDestroy.call($this);
                }

            });

        }

    }

    $.fn.uploadifive = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('The method ' + method + ' does not exist in $.uploadify');
        }

    }

})(jQuery);
/*
UploadiFive 1.2.2
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the UploadiFive Standard License <http://www.uploadify.com/uploadifive-standard-license>
*/
;(function(b){var a={init:function(c){return this.each(function(){var g=b(this);g.data("uploadifive",{inputs:{},inputCount:0,fileID:0,queue:{count:0,selected:0,replaced:0,errors:0,queued:0,cancelled:0},uploads:{current:0,attempts:0,successful:0,errors:0,count:0}});var d=g.data("uploadifive");var f=d.settings=b.extend({auto:true,buttonClass:false,buttonText:"Select Files",checkScript:false,dnd:true,dropTarget:false,fileObjName:"Filedata",fileSizeLimit:0,fileType:false,formData:{},height:30,itemTemplate:false,method:"post",multi:true,overrideEvents:[],queueID:false,queueSizeLimit:0,removeCompleted:false,simUploadLimit:0,truncateLength:0,uploadLimit:0,uploadScript:"uploadifive.php",width:100},c);if(isNaN(f.fileSizeLimit)){var e=parseInt(f.fileSizeLimit)*1.024;if(f.fileSizeLimit.indexOf("KB")>-1){f.fileSizeLimit=e*1000;}else{if(f.fileSizeLimit.indexOf("MB")>-1){f.fileSizeLimit=e*1000000;}else{if(f.fileSizeLimit.indexOf("GB")>-1){f.fileSizeLimit=e*1000000000;}}}}else{f.fileSizeLimit=f.fileSizeLimit*1024;}d.inputTemplate=b('<input type="file">').css({"font-size":f.height+"px",opacity:0,position:"absolute",right:"-3px",top:"-3px","z-index":999});d.createInput=function(){var j=d.inputTemplate.clone();var k=j.name="input"+d.inputCount++;if(f.multi){j.attr("multiple",true);}if(f.fileType){j.attr("accept",f.fileType);}j.bind("change",function(){d.queue.selected=0;d.queue.replaced=0;d.queue.errors=0;d.queue.queued=0;var l=this.files.length;d.queue.selected=l;if((d.queue.count+l)>f.queueSizeLimit&&f.queueSizeLimit!==0){if(b.inArray("onError",f.overrideEvents)<0){alert("The maximum number of queue items has been reached ("+f.queueSizeLimit+").  Please select fewer files.");}if(typeof f.onError==="function"){f.onError.call(g,"QUEUE_LIMIT_EXCEEDED");}}else{for(var m=0;m<l;m++){file=this.files[m];d.addQueueItem(file);}d.inputs[k]=this;d.createInput();}if(f.auto){a.upload.call(g);}if(typeof f.onSelect==="function"){f.onSelect.call(g,d.queue);}});if(d.currentInput){d.currentInput.hide();}d.button.append(j);d.currentInput=j;};d.destroyInput=function(j){b(d.inputs[j]).remove();delete d.inputs[j];d.inputCount--;};d.drop=function(m){d.queue.selected=0;d.queue.replaced=0;d.queue.errors=0;d.queue.queued=0;var l=m.dataTransfer;var k=l.name="input"+d.inputCount++;var j=l.files.length;d.queue.selected=j;if((d.queue.count+j)>f.queueSizeLimit&&f.queueSizeLimit!==0){if(b.inArray("onError",f.overrideEvents)<0){alert("The maximum number of queue items has been reached ("+f.queueSizeLimit+").  Please select fewer files.");}if(typeof f.onError==="function"){f.onError.call(g,"QUEUE_LIMIT_EXCEEDED");}}else{for(var o=0;o<j;o++){file=l.files[o];d.addQueueItem(file);}d.inputs[k]=l;}if(f.auto){a.upload.call(g);}if(typeof f.onDrop==="function"){f.onDrop.call(g,l.files,l.files.length);}m.preventDefault();m.stopPropagation();};d.fileExistsInQueue=function(k){for(var j in d.inputs){input=d.inputs[j];limit=input.files.length;for(var l=0;l<limit;l++){existingFile=input.files[l];if(existingFile.name==k.name&&!existingFile.complete){return true;}}}return false;};d.removeExistingFile=function(k){for(var j in d.inputs){input=d.inputs[j];limit=input.files.length;for(var l=0;l<limit;l++){existingFile=input.files[l];if(existingFile.name==k.name&&!existingFile.complete){d.queue.replaced++;a.cancel.call(g,existingFile,true);}}}};if(f.itemTemplate==false){d.queueItem=b('<div class="uploadifive-queue-item">                        <a class="close" href="#">X</a>                        <div><span class="filename"></span><span class="fileinfo"></span></div>                        <div class="progress">                            <div class="progress-bar"></div>                        </div>                    </div>');}else{d.queueItem=b(f.itemTemplate);}d.addQueueItem=function(j){if(b.inArray("onAddQueueItem",f.overrideEvents)<0){d.removeExistingFile(j);j.queueItem=d.queueItem.clone();j.queueItem.attr("id",f.id+"-file-"+d.fileID++);j.queueItem.find(".close").bind("click",function(){a.cancel.call(g,j);return false;});var k=j.name;if(k.length>f.truncateLength&&f.truncateLength!=0){k=k.substring(0,f.truncateLength)+"...";}j.queueItem.find(".filename").html(k);j.queueItem.data("file",j);d.queueEl.append(j.queueItem);}if(typeof f.onAddQueueItem==="function"){f.onAddQueueItem.call(g,j);}if(j.size>f.fileSizeLimit&&f.fileSizeLimit!=0){d.error("FILE_SIZE_LIMIT_EXCEEDED",j);}else{d.queue.queued++;d.queue.count++;}};d.removeQueueItem=function(m,l,k){if(!k){k=0;}var j=l?0:500;if(m.queueItem){if(m.queueItem.find(".fileinfo").html()!=" - Completed"){m.queueItem.find(".fileinfo").html(" - Cancelled");}m.queueItem.find(".progress-bar").width(0);m.queueItem.delay(k).fadeOut(j,function(){b(this).remove();});delete m.queueItem;d.queue.count--;}};d.filesToUpload=function(){var k=0;for(var j in d.inputs){input=d.inputs[j];limit=input.files.length;for(var l=0;l<limit;l++){file=input.files[l];if(!file.skip&&!file.complete){k++;}}}return k;};d.checkExists=function(k){if(b.inArray("onCheck",f.overrideEvents)<0){b.ajaxSetup({async:false});var j=b.extend(f.formData,{filename:k.name});b.post(f.checkScript,j,function(l){k.exists=parseInt(l);});if(k.exists){if(!confirm("A file named "+k.name+" already exists in the upload folder.\nWould you like to replace it?")){a.cancel.call(g,k);return true;}}}if(typeof f.onCheck==="function"){f.onCheck.call(g,k,k.exists);}return false;};d.uploadFile=function(k,l){if(!k.skip&&!k.complete&&!k.uploading){k.uploading=true;d.uploads.current++;d.uploads.attempted++;xhr=k.xhr=new XMLHttpRequest();if(typeof FormData==="function"||typeof FormData==="object"){var m=new FormData();m.append(f.fileObjName,k);for(i in f.formData){m.append(i,f.formData[i]);}xhr.open(f.method,f.uploadScript,true);xhr.upload.addEventListener("progress",function(n){if(n.lengthComputable){d.progress(n,k);}},false);xhr.addEventListener("load",function(n){if(this.readyState==4){k.uploading=false;if(this.status==200){if(k.xhr.responseText!=="Invalid file type."){d.uploadComplete(n,k,l);}else{d.error(k.xhr.responseText,k,l);}}else{if(this.status==404){d.error("404_FILE_NOT_FOUND",k,l);}else{if(this.status==403){d.error("403_FORBIDDEN",k,l);}else{d.error("Unknown Error",k,l);}}}}});xhr.send(m);}else{var j=new FileReader();j.onload=function(q){var t="-------------------------"+(new Date).getTime(),p="--",o="\r\n",s="";s+=p+t+o;s+='Content-Disposition: form-data; name="'+f.fileObjName+'"';if(k.name){s+='; filename="'+k.name+'"';}s+=o;s+="Content-Type: application/octet-stream"+o+o;s+=q.target.result+o;for(key in f.formData){s+=p+t+o;s+='Content-Disposition: form-data; name="'+key+'"'+o+o;s+=f.formData[key]+o;}s+=p+t+p+o;xhr.upload.addEventListener("progress",function(u){d.progress(u,k);},false);xhr.addEventListener("load",function(v){k.uploading=false;var u=this.status;if(u==404){d.error("404_FILE_NOT_FOUND",k,l);}else{if(k.xhr.responseText!="Invalid file type."){d.uploadComplete(v,k,l);}else{d.error(k.xhr.responseText,k,l);}}},false);var n=f.uploadScript;if(f.method=="get"){var r=b(f.formData).param();n+=r;}xhr.open(f.method,f.uploadScript,true);xhr.setRequestHeader("Content-Type","multipart/form-data; boundary="+t);if(typeof f.onUploadFile==="function"){f.onUploadFile.call(g,k);}xhr.sendAsBinary(s);};j.readAsBinaryString(k);}}};d.progress=function(l,j){if(b.inArray("onProgress",f.overrideEvents)<0){if(l.lengthComputable){var k=Math.round((l.loaded/l.total)*100);}j.queueItem.find(".fileinfo").html(" - "+k+"%");j.queueItem.find(".progress-bar").css("width",k+"%");}if(typeof f.onProgress==="function"){f.onProgress.call(g,j,l);}};d.error=function(l,j,k){if(b.inArray("onError",f.overrideEvents)<0){switch(l){case"404_FILE_NOT_FOUND":errorMsg="404 Error";break;case"403_FORBIDDEN":errorMsg="403 Forbidden";break;case"FORBIDDEN_FILE_TYPE":errorMsg="Forbidden File Type";break;case"FILE_SIZE_LIMIT_EXCEEDED":errorMsg="File Too Large";break;default:errorMsg="Unknown Error";break;}j.queueItem.addClass("error").find(".fileinfo").html(" - "+errorMsg);j.queueItem.find(".progress").remove();}if(typeof f.onError==="function"){f.onError.call(g,l,j);}j.skip=true;if(l=="404_FILE_NOT_FOUND"){d.uploads.errors++;}else{d.queue.errors++;}if(k){a.upload.call(g,null,true);}};d.uploadComplete=function(l,j,k){if(b.inArray("onUploadComplete",f.overrideEvents)<0){j.queueItem.find(".progress-bar").css("width","100%");j.queueItem.find(".fileinfo").html(" - Completed");j.queueItem.find(".progress").slideUp(250);j.queueItem.addClass("complete");}if(typeof f.onUploadComplete==="function"){f.onUploadComplete.call(g,j,j.xhr.responseText);}if(f.removeCompleted){setTimeout(function(){a.cancel.call(g,j);},3000);}j.complete=true;d.uploads.successful++;d.uploads.count++;d.uploads.current--;delete j.xhr;if(k){a.upload.call(g,null,true);}};d.queueComplete=function(){if(typeof f.onQueueComplete==="function"){f.onQueueComplete.call(g,d.uploads);}};if(window.File&&window.FileList&&window.Blob&&(window.FileReader||window.FormData)){f.id="uploadifive-"+g.attr("id");d.button=b('<div id="'+f.id+'" class="uploadifive-button">'+f.buttonText+"</div>");if(f.buttonClass){d.button.addClass(f.buttonClass);}d.button.css({height:f.height,"line-height":f.height+"px",overflow:"hidden",position:"relative","text-align":"center",width:f.width});g.before(d.button).appendTo(d.button).hide();d.createInput.call(g);if(!f.queueID){f.queueID=f.id+"-queue";d.queueEl=b('<div id="'+f.queueID+'" class="uploadifive-queue" />');d.button.after(d.queueEl);}else{d.queueEl=b("#"+f.queueID);}if(f.dnd){var h=f.dropTarget?b(f.dropTarget):d.queueEl.get(0);h.addEventListener("dragleave",function(j){j.preventDefault();j.stopPropagation();},false);h.addEventListener("dragenter",function(j){j.preventDefault();j.stopPropagation();},false);h.addEventListener("dragover",function(j){j.preventDefault();j.stopPropagation();},false);h.addEventListener("drop",d.drop,false);}if(!XMLHttpRequest.prototype.sendAsBinary){XMLHttpRequest.prototype.sendAsBinary=function(k){function l(n){return n.charCodeAt(0)&255;}var m=Array.prototype.map.call(k,l);var j=new Uint8Array(m);this.send(j.buffer);};}if(typeof f.onInit==="function"){f.onInit.call(g);}}else{if(typeof f.onFallback==="function"){f.onFallback.call(g);}return false;}});},debug:function(){return this.each(function(){console.log(b(this).data("uploadifive"));});},clearQueue:function(){this.each(function(){var f=b(this),c=f.data("uploadifive"),e=c.settings;for(var d in c.inputs){input=c.inputs[d];limit=input.files.length;for(i=0;i<limit;i++){file=input.files[i];a.cancel.call(f,file);}}if(typeof e.onClearQueue==="function"){e.onClearQueue.call(f,b("#"+c.settings.queueID));}});},cancel:function(d,c){this.each(function(){var g=b(this),e=g.data("uploadifive"),f=e.settings;if(typeof d==="string"){if(!isNaN(d)){fileID="uploadifive-"+b(this).attr("id")+"-file-"+d;}d=b("#"+fileID).data("file");}d.skip=true;e.filesCancelled++;if(d.uploading){e.uploads.current--;d.uploading=false;d.xhr.abort();delete d.xhr;a.upload.call(g);}if(b.inArray("onCancel",f.overrideEvents)<0){e.removeQueueItem(d,c);}if(typeof f.onCancel==="function"){f.onCancel.call(g,d);}});},upload:function(c,d){this.each(function(){var h=b(this),e=h.data("uploadifive"),f=e.settings;if(c){e.uploadFile.call(h,c);}else{if((e.uploads.count+e.uploads.current)<f.uploadLimit||f.uploadLimit==0){if(!d){e.uploads.attempted=0;e.uploads.successsful=0;e.uploads.errors=0;var g=e.filesToUpload();if(typeof f.onUpload==="function"){f.onUpload.call(h,g);}}b("#"+f.queueID).find(".uploadifive-queue-item").not(".error, .complete").each(function(){_file=b(this).data("file");if((e.uploads.current>=f.simUploadLimit&&f.simUploadLimit!==0)||(e.uploads.current>=f.uploadLimit&&f.uploadLimit!==0)||(e.uploads.count>=f.uploadLimit&&f.uploadLimit!==0)){return false;}if(f.checkScript){_file.checking=true;skipFile=e.checkExists(_file);_file.checking=false;if(!skipFile){e.uploadFile(_file,true);}}else{e.uploadFile(_file,true);}});if(b("#"+f.queueID).find(".uploadifive-queue-item").not(".error, .complete").size()==0){e.queueComplete();}}else{if(e.uploads.current==0){if(b.inArray("onError",f.overrideEvents)<0){if(e.filesToUpload()>0&&f.uploadLimit!=0){alert("The maximum upload limit has been reached.");}}if(typeof f.onError==="function"){f.onError.call(h,"UPLOAD_LIMIT_EXCEEDED",e.filesToUpload());}}}}});},destroy:function(){this.each(function(){var e=b(this),c=e.data("uploadifive"),d=c.settings;a.clearQueue.call(e);if(!d.queueID){b("#"+d.queueID).remove();}e.siblings("input").remove();e.show().insertBefore(c.button);c.button.remove();if(typeof d.onDestroy==="function"){d.onDestroy.call(e);}});}};b.fn.uploadifive=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments);}else{b.error("The method "+c+" does not exist in $.uploadify");}}};})(jQuery);