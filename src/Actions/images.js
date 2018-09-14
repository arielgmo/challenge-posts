export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCH_IMAGES_SUCCESSFUL = 'FETCH_IMAGES_SUCCESSFUL';
export const FETCH_IMAGES_FAILED = 'FETCH_IMAGES_FAILED';

export function fetchImages() {
  return {
    type: FETCH_IMAGES,
  };
}
