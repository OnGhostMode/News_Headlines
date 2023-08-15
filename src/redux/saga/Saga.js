import { takeLatest } from 'redux-saga/effects';
import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';
import { clearNews, fetchNews, retrieveNewsFromLocal } from './News';

/**
 * rootSaga(): Root file for saga implementation
 */
export default function* rootSaga() {
    yield takeLatest(NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_REQUEST, fetchNews);
    yield takeLatest(NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_CLEAR, clearNews);
    yield takeLatest(NEWS_REDUX_ACTION_TYPES.RETRIEVE_NEWS_FROM_LOCAL_REQUEST, retrieveNewsFromLocal);
    yield takeLatest(NEWS_REDUX_ACTION_TYPES.UPDATE_NEWS_DATA_REQUEST, retrieveNewsFromLocal);
}
