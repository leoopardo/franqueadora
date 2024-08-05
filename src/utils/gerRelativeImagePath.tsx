import envs from "@config/envs";

export function getRelativeImagePath(imagePath: string) {
  return `${envs.S3_IMAGES_URL}/${imagePath}`;
}