import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({ // 리듀서들을 하나로 합쳐줌
    user
})

export default rootReducer