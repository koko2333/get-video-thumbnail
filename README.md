# get-video-thumbnail

一个获取视频缩略图（视频截图）的方法

## 1、安装

```js
npm i get-vide-thumbnail -D
```

## 2、使用

```js
// 引入
import getVideoThumbnail from "get-video-thumbnail";
// 使用
getVideoThumbnail(
  "vide_url", // 视频连接，必传
  {
    // 额外参数，非必传
    time: 1, // 截图开始时间，非必传 默认1s
    width: 1920, // 截图的分辨率的宽度（单位px），非必传 默认1920px
    height: 1080, // 截图的分辨率的高度（单位px），非必传 默认根据视频宽度自动获取高度
  }
)
  .then((res) => {
    console.log(res);
    const {
      thumbnailSrc, // 缩略图地址（base64）
      thumbnailTime, // 截图开始时间
      thumbnailWidth, // 截图的分辨率的宽度
      thumbnailHeight, // 截图的分辨率的高度
    } = res;
  })
  .cache((error) => {
    console.log(error);
  });
```

## 3、TS 类型

```js
import {
  Options, // 额外参数
  ThumbnailData, // 方法返回的数据
} from "get-video-thumbnail";
```
