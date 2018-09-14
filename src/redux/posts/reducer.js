import { FETCH_POSTS_SUCCESSFUL } from '../../Actions/posts';

export default function images(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESSFUL: {
      return [...action.payload];
    }
    default:
      return state;
  }
}
