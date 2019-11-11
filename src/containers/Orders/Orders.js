import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useSelector, useDispatch } from 'react-redux';
import * as orderActionCreator from '../../store/actions/orderActionCreator';


const Orders = () => {
    const orders = useSelector((state) => state.order.orders);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderActionCreator.fetchOrders(token, userId));
    }, [dispatch, token, userId]);

    let displayOrders = <Spinner/>
    if(orders.length > 0){
        displayOrders = orders.map((order, i) => {
            return <Order price={order.price} ingredients={order.ingredients} key={i}/>
        })
    }
    return(
        <div>
            {displayOrders}
        </div>
    )
}

export default withErrorHandler(Orders, axios);