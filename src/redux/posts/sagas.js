import { call, put } from 'redux-saga/effects';
import { FETCH_POSTS_SUCCESSFUL, FETCH_POSTS_FAILED } from '../../Actions/posts';
import Api from '../../utils/api';

export default function* fetchPosts() {
  try {
    const posts = yield call(Api.fetchPosts);
    yield put({ type: FETCH_POSTS_SUCCESSFUL, payload: posts.data });
  } catch (e) {
    yield put({ type: FETCH_POSTS_FAILED, payload: e.message });
  }
}
