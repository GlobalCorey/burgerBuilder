import React, {Component} from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(result => {
            console.log('result: ', result.data);
            const parsedOrders = Object.values(result.data);
            console.log('parsedOrders: ', parsedOrders);
            this.setState({
                loading: false,
                orders: parsedOrders
            })
        })
        .catch(err => {
            this.setState({
                loading: false
            })
            console.log(err);
        })
    }

    render(){
        let orders = <Spinner/>
        if(this.state.orders.length > 0){
            orders = this.state.orders.map((order, i) => {
                return <Order price={order.price} ingredients={order.ingredients} key={i}/>
            })
        }
        console.log('state: ', typeof this.state.orders);
        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);