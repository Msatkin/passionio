import * as types from './actionTypes';

export function load() {
    return {type: types.ON_LOADING};
}

export function loadingComplete() {
    return {type: types.LOADING_COMPLETE};
}