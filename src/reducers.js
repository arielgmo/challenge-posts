import { combineReducers } from 'redux';
import imagesReducer from './redux/images/reducer';
import postsReducer from './redux/posts/reducer';
import usersReducer from './redux/users/reducer';

export default combineReducers({
  imagesReducer,
  postsReducer,
  usersReducer,
});
