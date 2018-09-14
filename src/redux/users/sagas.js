import { call, put } from 'redux-saga/effects';
import { FETCH_USERS_SUCCESSFUL, FETCH_USERS_FAILED } from '../../Actions/users';
import Api from '../../utils/api';

export default function* fetchPosts() {
  try {
    const users = yield call(Api.fetchUsers);
    yield put({ type: FETCH_USERS_SUCCESSFUL, payload: users.data });
  } catch (e) {
    yield put({ type: FETCH_USERS_FAILED, payload: e.message });
  }
}
