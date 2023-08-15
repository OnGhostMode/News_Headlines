import {
    call, put
} from 'redux-saga/effects';
import { storeData } from '../../offline/OfflineStorage';
import Caller from '../config/Caller';
import API from '../config/Url';
import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';

/**
 * fetchNews(): Saga for fetching news data
 * @author VIVEK PS
 */
export function* fetchNews() {
    try {
        let response = yield call(Caller, 'GET', API.FETCH_NEWS);
        let json = JSON.stringify(response)
        let retrievedData = JSON.parse(json)?.data?.articles
        yield put({
            type: NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_RESPONSE,
            payload: retrievedData,
        });
        storeData(retrievedData)
    } catch (err) {
        console.log("----------- fetchNews saga err ------------", err)
        yield put({
            type: NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_ERROR,
            payload: {
                error: err?.response?.data,
            },
        });
    }
}

/**
 * retrieveNewsFromLocal(): Saga for clearing news data
 * @author VIVEK PS
 */
export function* retrieveNewsFromLocal(action) {
    try {
        let retrievedData = action.payload
        yield put({
            type: NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_RESPONSE,
            payload: retrievedData,
        });
    } catch (err) {
        console.log("----------- fetchNews saga err ------------", err)
        yield put({
            type: NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_ERROR,
            payload: {
                error: err?.response?.data,
            },
        });
    }
}

/**
 * clearNews(): Saga for clearing news data
 * @author VIVEK PS
 */
export function* clearNews() {
    try {
        let response = yield call(Caller, 'GET', API.FETCH_NEWS);
    } catch (err) {
        console.log("----------- saga clearNews err ------------", err)
        yield put({
            type: NEWS_REDUX_ACTION_TYPES.FETCH_NEWS_DATA_ERROR,
            payload: {
                error: err?.response?.data,
            },
        });
    }
}