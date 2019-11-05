import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
        
    }

    render(){
        let summary = <Redirect to='/'/>;
        
        if(this.props.ingredients){
            const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancel={this.checkoutCanceledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        render={ (props) => 
                            <ContactData 
                                ingredients={this.props.ingredients} 
                                totalPrice={this.props.totalPrice.toFixed(2)}
                                {...props}/>
                    }/>
                </div>
            )   
        }
        return (
            <div> 
                {summary}
            </div>
        )
    }
}

const mapStateToProps = ({burger, order}) => {
    return {
        ingredients: burger.ingredients,
        totalPrice: burger.totalPrice,
        purchased: order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);