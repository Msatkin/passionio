import {combineReducers} from 'redux';
import tabReducer from './tabReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    tabs: tabReducer,
    app: appReducer
})

export default rootReducer;