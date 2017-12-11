import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function appReducer(state = initialState.app, action) {
    switch(action.type) {
        case types.ON_LOADING:
            return {isLoading: true};
            
        case types.LOADING_COMPLETE:
            return {isLoading: false};
        
        default: 
            return state;
    }
}