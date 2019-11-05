import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
    burger: burgerBuilderReducer, 
    order: orderReducer,
    auth: authReducer
})
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null  || compose;
// const logger = store => {
//     //store recieves getState, dispatch(), expeted to return dispatch(action)
//     return next => {
//         //the dispatch(action) function here. Initial action is null initially, so code 
//         // below does not execute on first startup
//         return action => {
//             console.log('[Middleware Dispatching: ', action);
//             const result = next(action);
//             console.log('[Middleware next state: ', store.getState());
//             return result;
//         }
//     }
// }
const store = createStore(rootReducer,
                            composeEnhancers(applyMiddleware(thunk))); 

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
