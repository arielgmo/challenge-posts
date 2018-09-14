import { FETCH_USERS_SUCCESSFUL } from '../../Actions/users';

export default function images(state = [], action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESSFUL: {
      return [...action.payload];
    }
    default:
      return state;
  }
}
