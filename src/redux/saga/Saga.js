import { takeLatest } from 'redux-saga/effects';
import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';
import { clearNews, fetchNews } from './News';

export default function* rootSaga() {
    yield takeLatest(NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_REQUEST, fetchNews);
    yield takeLatest(NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_CLEAR, clearNews);
}