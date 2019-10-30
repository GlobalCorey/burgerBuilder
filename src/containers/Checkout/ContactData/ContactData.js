import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Blue',
                address: {
                    steet: 'TestStreet',
                    zipCode: '12366',
                    country: 'Robania'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'supersonic'
        };
        axios.post('/orders.json', order)
        .then(result => {
            this.setState({loading: false, purchasing: false})
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({loading: false, purchasing: false})
            console.log(err);
        })
    }

    

    render() {
        let form = <Spinner/>
        if(!this.state.loading){
            form = (
                <form>
                    <input className={classes.Input} type="text" id="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="text" id="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" id="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" id="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            )
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}


export default ContactData;