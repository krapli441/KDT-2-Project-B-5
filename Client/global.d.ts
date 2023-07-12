declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}
declare module "*.png" {
  const value: string;
  export default value;
}
declare namespace JSX {
  interface IntrinsicElements {
    "dotlottie-player": any;
  }
}
declare module ".*mp3" {
  const value: any;
  export default value;
}

declare global {
  interface Window {
    Tmapv3: any;
  }
}
