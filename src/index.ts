import { ThumbnailData, Options } from "./types";
const GetVideoThumbnail = (src: string, options?: Options): ThumbnailData => {
  if (!src) {
    throw Error("Please enter the video link address");
  }
  options = options || {
    width: 1920,
    time: 1000,
  };
  const { width, height, time } = options;
  /* 创建视频dom节点 */
  const videoElement: HTMLVideoElement = document.createElement("video");
  videoElement.style.visibility = "hidden";
  videoElement.style.width = `${width}px`;
  videoElement.style.height = height ? `${height}px` : "auto";
  videoElement.muted = true;
  videoElement.src = src;
  videoElement.setAttribute("crossOrigin", "anonymous");
  document.body.appendChild(videoElement);
  videoElement.oncanplaythrough = () => {
    /* 创建canvas节点 */
    const canvasElement: HTMLCanvasElement = document.createElement("canvas");
    canvasElement.width = width;
    canvasElement.height = getCanvasElementHeight(height, videoElement);
    const canvasFill = canvasElement.getContext("2d");
    videoElement.play().then(() => {
      setTimeout(() => {
        canvasFill.drawImage(
          videoElement,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        /*把canvas变成图片*/
        const imgSrc = canvasElement.toDataURL("image/jpeg");
        console.log(imgSrc);
      }, time);
    });
    /*    return new Promise((resolve) => {
      videoElement.onplaying = () => {
        setTimeout(() => {
          canvasFill.drawImage(
            videoElement,
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
          /!* 把canvas变成图片 *!/
          const imgSrc = canvasElement.toDataURL("image/jpeg");
          resolve(imgSrc);
        }, time);
      };
    });*/
  };

  return {
    thumbnailSrc: "",
    thumbnailTime: 0,
    thumbnailWidth: "1920px",
  };
};

const getCanvasElementHeight = (
  height: number | undefined,
  videoElement: HTMLVideoElement
): number => {
  if (height) {
    return height;
  }
  return videoElement.offsetHeight;
};

export default GetVideoThumbnail;

/*const getVideoPreviewImg = (url, width, height) => {
  width = width || 90;
  height = height || 90;
  /!* 创建视频dom节点 *!/
  let node = document.createElement("video");
  node.style.width = `${width}px`;
  node.style.height = `${height}px`;
  /!* 自动播放 *!/
  node.autoplay = true;
  node.src = url;
  node.setAttribute("crossOrigin", "anonymous");
  /!* 创建canvas节点 *!/
  let canvasNode = document.createElement("canvas");
  canvasNode.width = width;
  canvasNode.height = height;
  const canvasFill = canvasNode.getContext("2d");
  /!* 把视频变成canvas *!/
  return new Promise((resolve) => {
    node.onplaying = () => {
      setTimeout(() => {
        canvasFill.drawImage(node, 0, 0, canvasNode.width, canvasNode.height);
        /!* 把canvas变成图片 *!/
        const imgSrc = canvasNode.toDataURL("image/jpeg");
        resolve(imgSrc);
      }, 800);
    };
  });
};*/
