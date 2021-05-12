export default interface Logo {
  /** @description Logo file url */
  Url: string;
  /** @description Logo type or style */
  Type: "Color" | "BlackAndWhite" | "Icon";
  /** @description Logo filetype */
  ImageFormat: "SVG" | "PNG";
}
