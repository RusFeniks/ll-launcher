import AddonFile from "./addon-file.interface";

export default interface AddonInfo {
  id: number,
  title: string,
  description: string
  guideLink?: string,
  image?: string,
  website?: string,
  files?: AddonFile[],
}