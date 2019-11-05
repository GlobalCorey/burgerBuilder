import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const orderSuccess = (data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            id: data.id,
            data: data.order
        }
    }
}
const orderFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        payload: error
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const orderBurgerStart = () => {
    return{
        type: actionTypes.ORDER_BURGER_START
    }
}

export const orderBurger = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
        .then(result => {
            dispatch(orderSuccess({
                id: result.data.name, 
                order: orderData
            }));
        })
        .catch(err => {
            dispatch(orderFailed(err));
        })
    }
}

const getOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

const getOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        payload: error
    }
}

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
        .then(result => {
            const parsedOrders = Object.values(result.data);
            dispatch(getOrdersSuccess(parsedOrders));
        })
        .catch(err => {
            dispatch(getOrderFailed(err));
        })
    }
}