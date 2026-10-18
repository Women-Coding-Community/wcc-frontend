import { Image, FormattedImage } from './types';

/**
 * Transforms a Google Drive file link into a direct download link.
 * If the path is not a Google Drive link, it returns the original path.
 *
 * @param path The image path to transform
 * @returns The transformed path
 */
export const getGoogleDriveDirectLink = (path: string): string => {
  if (path.includes('drive.google.com/file/d/')) {
    const id = path.split('/d/')[1].split('/')[0];
    return `https://drive.google.com/uc?id=${id}&export=download`;
  }
  return path;
};

/**
 * Formats an Image object by ensuring its path is a direct link if it's from Google Drive.
 *
 * @param image The Image object to format
 * @returns A new Image object with the formatted path, marked as FormattedImage
 */
export const formatImage = (image: Image): FormattedImage => {
  if (!image) return image as FormattedImage;
  return {
    ...image,
    path: getGoogleDriveDirectLink(image.path),
    __formatted: true,
  } as FormattedImage;
};
