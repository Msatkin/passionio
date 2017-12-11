import jsonApi from '../api/jsonApi';
import * as types from './actionTypes';
import * as appActions from './appActions';

//Return promise of api tab response
function callCreateTab(type, index, parentId, parentType) {
    console.log(type, index, parentId, parentType)
    return new Promise((resolve, reject) => {
        try {
            resolve(jsonApi.createTab(type, index, parentId, parentType));
        }
        catch (error) {
            reject(error);
        }
    });
}

export function createTab(type, index, parentId, parentType) {
    return function action(dispatch) {
        dispatch(appActions.load());
        callCreateTab(type, index, parentId, parentType)
        .then((result) => {
            dispatch(appActions.loadingComplete());
            return dispatch({type: types.CREATE_TAB_SUCCESS, tab: result})})
        .catch((result) => console.log(result));
    }
}

export function clearTabs() {
    return {type: types.CLEAR_TABS};
}

//Return promise of api search response
function callSearchTab(tab, search) {
    return new Promise((resolve, reject) => {
        try {
            if (search != null) {
                resolve(jsonApi.searchFor(tab.table.data, search));
            }
            else {
                resolve(tab.table.data);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

export function searchTab(tab, search) {
    return function action(dispatch) {
        //toggles loading icon
        dispatch(appActions.load());
        callSearchTab(tab, search)
        .then((result) => {
            tab.page.isSearching = (search != null);
            tab.table.search = result;
            //toggles loading icon
            dispatch(appActions.loadingComplete());
            return dispatch(gotoPage(tab, 0))})
        .catch((result) => console.log(result));
    }
}

export function gotoPage(tab, pageIndex) {
    let table = (tab.page.isSearching) ? tab.table.search : tab.table.data;
    tab.page.data = getPage(table, tab.page.length, pageIndex);
    tab.page.id = pageIndex;
    return {type: types.UPDATE_TABLE_DATA, tab: tab}
}

export function activateTab(type) {
    return {type: types.UPDATE_ACTIVE_TAB, tab: type}
}

function getPage(table, pageLength, pageNumber) {
    //Gets max value either the max value or the page length + new page start
    let maxValue = (pageLength + (pageNumber * pageLength) > table.length) ? table.length : (pageNumber * pageLength) + pageLength;
    return table.slice(pageNumber * pageLength, maxValue);
}