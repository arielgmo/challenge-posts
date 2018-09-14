import { takeLatest } from 'redux-saga/effects';
import { FETCH_IMAGES } from './Actions/images';
import { FETCH_POSTS } from './Actions/posts';
import { FETCH_USERS } from './Actions/users';
import fetchImages from './redux/images/sagas';
import fetchPosts from './redux/posts/sagas';
import fetchUsers from './redux/users/sagas';

function* mySaga() {
  yield takeLatest(FETCH_IMAGES, fetchImages);
  yield takeLatest(FETCH_POSTS, fetchPosts);
  yield takeLatest(FETCH_USERS, fetchUsers);
}

export default mySaga;
