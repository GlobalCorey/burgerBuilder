import React, {Component} from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as orderActionCreator from '../../store/actions/orderActionCreator';


class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render(){
        let orders = <Spinner/>
        if(this.props.orders.length > 0){
            orders = this.props.orders.map((order, i) => {
                return <Order price={order.price} ingredients={order.ingredients} key={i}/>
            })
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = ({order, auth}) => {
    return {
        orders: order.orders,
        token: auth.token,
        userId: auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(orderActionCreator.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));