import {
    call, put
} from 'redux-saga/effects';
import Caller from '../config/Caller';
import API from '../config/Url';
import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * fetchNews(): Saga for fetching news data
 * @author VIVEK PS
 */
export function* fetchNews() {
    try {
        console.log("----------- fetchNews ------------")
        let response = yield call(Caller, 'GET', API.FETCH_NEWS);
        let json = JSON.stringify(response)
        let retrievedData = JSON.parse(json)?.data?.articles
        console.log("----------- saga response ------------", retrievedData)
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
        console.log("----------- clearNews ------------")
        let response = yield call(Caller, 'GET', API.FETCH_NEWS);
        console.log("----------- saga response ------------", response)

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