import { ThumbnailData, Options } from "./types";
const getVideoThumbnail = (
  src: string,
  options?: Options
): Promise<ThumbnailData> => {
  if (!src) {
    throw Error("Please enter the video link address");
  }
  options = {
    ...{
      width: 1920,
      time: 1000,
    },
    ...options,
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

  return new Promise((resolve, reject) => {
    videoElement.oncanplaythrough = () => {
      /* 创建canvas节点 */
      const canvasElement: HTMLCanvasElement = document.createElement("canvas");
      canvasElement.width = width;
      const canvasElementHeight: number = getCanvasElementHeight(
        height,
        videoElement
      );
      canvasElement.height = canvasElementHeight;
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
          resolve({
            thumbnailSrc: imgSrc,
            thumbnailTime: time,
            thumbnailWidth: width + "px",
            thumbnailHeight: canvasElementHeight + "px",
          });
        }, time);
      });
    };
  });
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

export default getVideoThumbnail;
