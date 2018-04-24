ng.zl
===

ng.zl 提供给公司管理后台的组件库。 
因为需要管理后台的业务有很多，于是有了这，而且仅chrome。

## 安装

```
bower install ng.zl -D
```

## 依赖性

见 bower.json

## demo

[demo](http://zlfe.github.io/ng.zl/demo/index.html)

## 部分API

### $zl

见下：
```javascript
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
```

alert、confirm、prompt、tips等有个参数是ev，可选，作用是对话框弹起的时候是否有聚焦到ev.target的功能。

progress 见demo

scroll 对`#_siteContent` 的scroll。所以请保证你的应用有 #_siteContent 切下面有且只有一个儿子 
```html
<md-content id="_siteContent"><div ui-view></div></md-content>
```

