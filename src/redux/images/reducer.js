import { FETCH_IMAGES_SUCCESSFUL } from '../../Actions/images';

export default function images(state = [], action) {
  switch (action.type) {
    case FETCH_IMAGES_SUCCESSFUL: {
      return [...action.payload];
    }
    default:
      return state;
  }
}
