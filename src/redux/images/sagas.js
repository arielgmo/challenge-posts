import { call, put } from 'redux-saga/effects';
import { FETCH_IMAGES_SUCCESSFUL, FETCH_IMAGES_FAILED } from '../../Actions/images';
import Api from '../../utils/api';

export default function* fetchImages() {
  try {
    const images = yield call(Api.fetchImages);
    yield put({ type: FETCH_IMAGES_SUCCESSFUL, payload: images.data });
  } catch (e) {
    yield put({ type: FETCH_IMAGES_FAILED, payload: e.message });
  }
}
