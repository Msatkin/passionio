import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function tabReducer(state = initialState.tabs, action) {
    switch(action.type) {
        case types.CREATE_TAB_SUCCESS:
            //Gets tab of same type 
            let tabObject = state.filter((tab, index) => tab.table.name === action.tab.table.name);
            let inactiveTabs = deactivateTabs(state);
            //Checks if tab of same type exists and replaces it if it does or concats if it doesn't
            let newState = (tabObject.length) ? inactiveTabs.map((tab) => (tab.table.name === action.tab.table.name) ? action.tab : tab) : inactiveTabs.concat(action.tab);
            //Removes tabs past new tab to clear previous searching
            return newState.slice(0, newState.findIndex((tab) => tab === action.tab) + 1);
            
        case types.CLEAR_TABS:
            return [];
            
        case types.UPDATE_TABLE_DATA:
            return state.map((element) => {
                element.table.data = (element.id === action.tab.id) ? action.tab.table.data : element.table.data;
                return element; 
            });

        case types.UPDATE_ACTIVE_TAB:
            return setActiveTab(state, action.tab);
        
        default: 
            return state;
    }
}

function deactivateTabs(tabs) {
    return tabs.map((tab) => {
        tab.active = false;
        return tab;
    });
}

function setActiveTab(tabs, activeType) {
    return tabs.map((tab) => {
        (tab.title === activeType) ? tab.active = true : tab.active = false;
        return tab;
    });
}