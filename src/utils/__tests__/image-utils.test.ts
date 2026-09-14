import { getGoogleDriveDirectLink, formatImage } from '../image-utils';
import { Image } from '../types';

describe('image-utils', () => {
  describe('getGoogleDriveDirectLink', () => {
    it('should transform a Google Drive file link into a direct download link', () => {
      const input =
        'https://drive.google.com/file/d/1abc-123_xyz/view?usp=sharing';
      const expected =
        'https://drive.google.com/uc?id=1abc-123_xyz&export=download';
      expect(getGoogleDriveDirectLink(input)).toBe(expected);
    });

    it('should return the original path if it is not a Google Drive file link', () => {
      const input = 'https://example.com/image.png';
      expect(getGoogleDriveDirectLink(input)).toBe(input);
    });

    it('should return the original path if it is a different Google Drive link', () => {
      const input = 'https://drive.google.com/open?id=1abc-123_xyz';
      expect(getGoogleDriveDirectLink(input)).toBe(input);
    });
  });

  describe('formatImage', () => {
    it('should format the path of an Image object if it is from Google Drive and mark it as formatted', () => {
      const image: Image = {
        path: 'https://drive.google.com/file/d/1abc-123_xyz/view',
        alt: 'Test Image',
        type: 'image/png',
      };
      const formatted = formatImage(image);
      expect(formatted.path).toBe(
        'https://drive.google.com/uc?id=1abc-123_xyz&export=download',
      );
      expect(formatted.alt).toBe(image.alt);
      expect(formatted.type).toBe(image.type);
      expect((formatted as any).__formatted).toBe(true);
    });

    it('should mark the Image object as formatted even if the path is not from Google Drive', () => {
      const image: Image = {
        path: 'https://example.com/image.png',
        alt: 'Test Image',
        type: 'image/png',
      };
      const formatted = formatImage(image);
      expect(formatted.path).toBe(image.path);
      expect((formatted as any).__formatted).toBe(true);
    });

    it('should return null/undefined if input is null/undefined', () => {
      expect(formatImage(null as unknown as Image)).toBeNull();
      expect(formatImage(undefined as unknown as Image)).toBeUndefined();
    });
  });
});
