import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route } from 'react-router-dom';
// import queryString from 'querystring';
import ContactData from '../../containers/Checkout/ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount(){
        //Or just use the history.location.state from BurgerBuilder, way easier
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                totalPrice = parseFloat(param[1]).toFixed(2);
            }
            else{
                ingredients[param[0]] = parseInt(param[1]);
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        })
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
        
    }

    render(){
        return (
            <div>
                {this.state.ingredients !== null && 
                <div>
                    <CheckoutSummary 
                        ingredients={this.state.ingredients}
                        checkoutCancel={this.checkoutCanceledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        render={ (props) => <ContactData 
                                            ingredients={this.state.ingredients} 
                                            totalPrice={this.state.totalPrice}
                                            {...props}/>
                                }
                    />
                </div>
                }
            </div>
        )
    }
}

export default Checkout;