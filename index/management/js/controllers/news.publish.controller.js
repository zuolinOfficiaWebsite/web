/**
 * Created by Administrator on 2016/1/15.
 */
window.myModule.controller("NewsPublishController", function ($scope, DataService, $state, $timeout, $mdDialog, $zl, DataCacheService, UploaderService, $location) {
  'use strict';

  //var userInfo = $zl.userInfo.get();
  //if(!userInfo) {
  //    $state.go('login');
  //    $zl.tips('用户未登录');
  //}
  $scope.host = $location.$$protocol + "://" + $location.$$host + "/";

  $scope.news = DataCacheService['newsInfo'].getReset();

  if (!$scope.news.createTime) {
    $scope.news.createDate = new Date();
  } else {
    $scope.news.createDate = new Date($scope.news.createTime);
  }


  if (!$scope.news.id) {
    $scope.news.content = '请在此书写新闻正文（注意：如果填写了新闻来源链接，则正文无效）';
  }

  var newsContent = $scope.news.content;

  $timeout(function () {
    window.newsEditor.html(newsContent);
  }, 1);


  $scope.editor = {
    config: {
      resizeType: 1,
      allowPreviewEmoticons: false,
      allowImageUpload: false,
      themeType: 'simple',
      width: "100%",
      autoHeightMode: true,
      height: "220px",
      items: [
        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
        'insertunorderedlist', '|', 'emoticons', 'image', 'media', 'link', '|', 'source']
    }
  };

  function getNews() {
    return {
      id: $scope.news.id,
      title: $scope.news.title,
      newsAbstract: $scope.news.newsAbstract,
      content: $scope.news.content,
      sourceUri: $scope.news.sourceUri,
      sourceText: $scope.news.sourceText,
      imageUri: $scope.news.imageUri,
      tags: $scope.news.tags,
      createTime: $scope.news.createDate.valueOf()
    };
  }

  $scope.news.onPreview = function (ev) {

    $mdDialog.show({
      controller: function (scope, $mdDialog) {
        if (!$scope.news.content || !$scope.news.newsAbstract || !$scope.news.title) {
          scope.content = "<h4>您还未书写新闻标题，摘要或正文</h4>";
        } else {
          scope.content = (function () {
            var mainTitle = "<p style='font-family: 微软雅黑; font-size: 18pt; text-align:center; line-height: 2.8em; margin: 0;'>" +
              $scope.news.title + "</p>";
            var subTitle = "<p style='font-family: 微软雅黑; font-size: 11.5pt; text-align:center; line-height: 2.8em;'>" +
              $scope.news.newsAbstract + "</p>";
            var newsContent = "<div style='padding: 30px;'>" + $scope.news.content + "</p>";
            return mainTitle + subTitle + newsContent;
          })();
        }
        scope.cancel = function () {
          $mdDialog.cancel();
        };
      },
      template: "<div class='md-padding' layout='column' layout-align='space-around center'>" +
      "<md-content newspreviewdirective class='news-preview-content'></md-content>" +
      "<md-button class='md-raised md-primary' ng-click='cancel()'>确定</md-button>" +
      "</div>",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false
    });

  };

  $scope.news.publish = function () {
    if (!$scope.news.content || !$scope.news.newsAbstract || !$scope.news.title) {
      $zl.alert("您还未书写新闻标题，摘要或正文", "注意");
      return;
    }
    if ($scope.news.sourceUri && !/^http(s){0,1}:\/\/[\s\S]+/.test($scope.news.sourceUri)) {
      $zl.alert("新闻来源链接不合法", "注意");
      return;
    }
    var newsData = getNews();
    newsData.status = 0; //0代表发布
    if (typeof newsData.id !== 'undefined') {
      DataService.updateNews(newsData)
        .then(function (data) {
          $zl.tips('更新成功');
          $state.go('news_list');

        }, function () {
          $zl.tips('更新失败');
        });
    } else {
      DataService.addNews(newsData)
        .then(function (data) {
          $zl.tips('发布成功');
          $state.go('news_list');
        }, function () {
          $zl.tips('发布失败');
        });
    }

  };

  $scope.news.saveDraft = function () {
    if ($scope.newsForm.$invalid) {
      $zl.tips("请填写标题和来源");
      return;
    }
    var newsData = getNews();
    newsData.status = 1; //1代表草稿
    if (typeof newsData.id !== 'undefined') {
      DataService.updateNews(newsData)
        .then(function (data) {
          $zl.tips('更新草稿成功');
          $state.go('news_list');

        }, function () {
          $zl.tips('更新草稿失败');
        });
    } else {
      DataService.addNews(newsData)
        .then(function (data) {
          $zl.tips('保存草稿成功');
          $state.go('news_list');

        }, function () {
          $zl.tips('保存草稿失败');
        });
    }

  };

  $scope.news.delete = function () {
    var newsData = getNews();
    if (typeof newsData.id !== 'undefined') {
      DataService.deleteNews({
        id: newsData.id
      })
        .then(function (data) {
          $zl.tips('删除成功');
          $state.go('news_list');

        }, function () {
          $zl.tips('删除失败');
        });
    } else {
      $zl.tips('您还未保存');
    }
  };


  UploaderService.fileUpload($('#uploadNewsImage'), {
    uploadScript: '/corp/apk/uploadFiles',
    buttonText: '上传新闻缩略图',
    fileType: 'jpg',
    onAddQueueItem: function (file) {
      var postfix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
      var fileType = {
        'png': true,
        'jpg': true,
        'bmp': true
      };
      if (fileType[postfix.toLowerCase()] !== true) {
        $('#uploadNewsImage').uploadifive('cancel', file);
        $zl.tips('类型错误，请上传图片');
      }
    },
    onUploadComplete: function (file, data) {
      data = angular.fromJson(data);

      if (data.errorCode === 200) {
        $scope.$apply(function () {
          // var path = data.response.resSummaryInfos[0].path; 这个服务器返回的path是有问题的，虽然图片已经上传成功了
          $scope.news.imageUri = 'uploads/apk/' + file.name;
          $zl.tips('上传成功');
        });
      } else {
        $scope.$apply(function () {
          $zl.tips(data.errorDescription || '未知错误');
        });
      }
    }
  });

  UploaderService.fileUpload($('#uploadNewsContentImage'), {
    uploadScript: '/corp/apk/uploadFiles',
    buttonText: '上传新闻正文图片',
    fileType: 'jpg',
    onAddQueueItem: function (file) {
      var postfix = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);
      var fileType = {
        'png': true,
        'jpg': true,
        'bmp': true
      };
      if (fileType[postfix.toLowerCase()] !== true) {
        $('#uploadNewsContentImage').uploadifive('cancel', file);
        $zl.tips('类型错误，请上传图片');
      }
    },
    onUploadComplete: function (file, data) {
      data = angular.fromJson(data);

      if (data.errorCode === 200) {
        $scope.$apply(function () {
          var imgUrl = data.response.resSummaryInfos[0].path;
          window.newsEditor.insertHtml('<img src="' + ($scope.host + imgUrl) + '">');
          $zl.tips('上传成功');
        });
      } else {
        $scope.$apply(function () {
          $zl.tips(data.errorDescription || '未知错误');
        });
      }
    }
  });

  //$scope.news.deleteNews = function() {
  //    var newsData = getNews();
  //    newsData.status = 1; //1代表草稿
  //    DataService.addNews(newsData)
  //        .then(function(data) {
  //            $zl.tips('保存草稿成功');
  //        }, function() {
  //            $zl.tips('保存草稿失败');
  //        });
  //};


});