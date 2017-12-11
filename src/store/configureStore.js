import {createStore, applyMiddleware} from 'redux';  
import rootReducer from '../reducers/rootReducer';  
import thunk from 'redux-thunk';
import initialState from './../reducers/initialState';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {  
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
  );
}