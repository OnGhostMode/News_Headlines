import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';

/**
 * News reducer actions
 * @author VIVEK PS
 **/
const ACTION_TYPES = NEWS_REDUX_ACTION_TYPES;

/**
 * fetchNewsData(): Fetches lartest news data and saves to redux
 * @param {*} data 
 * @returns 
 * @author VIVEK PS
 */
export const fetchNewsData = () => {
    console.log("------------- fetch====")
    return {
        type: ACTION_TYPES.FETCH_NEWS_DATA_REQUEST,
    };
};

/**
 * clearNewsData(): Clears saved news data from redux
 * @returns 
 * @author VIVEK PS
 */
export const clearNewsData = () => {
    console.log("------------- clear====")
    return {
        type: ACTION_TYPES.FETCH_NEWS_DATA_CLEAR,
    };
};