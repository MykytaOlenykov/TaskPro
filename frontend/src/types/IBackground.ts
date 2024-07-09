interface IBackgroundType {
  baseUrl: string;
  largeUrl: string;
}

export interface IBackground {
  _id: string;
  previewUrl: string;
  mobile: IBackgroundType;
  tablet: IBackgroundType;
  desktop: IBackgroundType;
}
