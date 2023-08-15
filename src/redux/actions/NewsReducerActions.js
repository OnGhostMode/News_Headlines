import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';

/**
 * News reducer actions
 * @author VIVEK PS
 **/
const ACTION_TYPES = NEWS_REDUX_ACTION_TYPES;

/**
 * fetchNewsData(): Fetches lartest news data and saves to redux
 * @returns 
 * @author VIVEK PS
 */
export const fetchNewsData = () => {
    return {
        type: ACTION_TYPES.FETCH_NEWS_DATA_REQUEST,
    };
};

/**
 * retrieveDataFromLocal(): Fetches saved news data from local and saves to redux
 * @param {*} data 
 * @returns 
 * @author VIVEK PS
 */
export const retrieveDataFromLocal = (data) => {
    return {
        type: ACTION_TYPES.RETRIEVE_NEWS_FROM_LOCAL_REQUEST,
        payload: data
    };
};

/**
 * updateNewsData(): Updates news data from payload provided
 * @param {*} data 
 * @returns 
 * @author VIVEK PS
 */
export const updateNewsData = (data) => {
    return {
        type: ACTION_TYPES.UPDATE_NEWS_DATA_REQUEST,
        payload: data
    };
};

/**
 * clearNewsData(): Clears saved news data from redux
 * @returns 
 * @author VIVEK PS
 */
export const clearNewsData = () => {
    return {
        type: ACTION_TYPES.FETCH_NEWS_DATA_CLEAR,
    };
};