import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.ORDER_BURGER_START: 
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.payload.data,
                id: action.payload.id
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_INIT :
            return {
                ...state,
            }
        case actionTypes.FETCH_ORDERS_START :
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS :
            return {
                ...state,
                orders: action.payload,
                loading: false,
            }
        case actionTypes.FETCH_ORDERS_FAILED :
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default orderReducer;