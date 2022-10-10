interface ThumbnailData {
  thumbnailSrc: string;
  thumbnailTime: number;
  thumbnailWidth: string;
  thumbnailHeight: string;
}

interface Options {
  width?: number;
  height?: number;
  time?: number;
  crossOrigin?: boolean;
}

export type {
  ThumbnailData, // 输出出来的数据类型
  Options, // 传入参数的数据类型
};

declare function getVideoThumbnail(
  src: string,
  options?: Options
): Promise<ThumbnailData>;

export default getVideoThumbnail;
