import NEWS_REDUX_ACTION_TYPES from '../constants/NewsReducerConstants';

const ACTION_TYPES = NEWS_REDUX_ACTION_TYPES;
const initialState = {};

/**
 * NewsReducer(): Handles the rexux operations for news data
 * @param {*} state
 * @param {*} action
 * @returns
 * @author VIVEK PS
 */
const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_NEWS_DATA_RESPONSE:
            return {
                ...state,
                newsData: action.payload || []
            };

        case ACTION_TYPES.FETCH_NEWS_DATA_CLEAR:
            return {
                ...state,
                newsData: []
            };

        default:
            return state;
    }
};

export default NewsReducer;
