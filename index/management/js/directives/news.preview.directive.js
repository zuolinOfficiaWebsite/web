/**
 * Created by Administrator on 2016/1/18.
 */
window.myModule.directive('newspreviewdirective', function () {
    "use strict";
    return {
        scope: true,
        link: function(scope, element, attrs) {
            $(element).html(scope.content);
        }
    };
});
