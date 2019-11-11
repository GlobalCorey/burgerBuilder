import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = (props) => {

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data')
        
    }
    
    let summary = <Redirect to='/'/>;
        
    if(props.ingredients){
        const purchaseRedirect = props.purchased ? <Redirect to='/'/> : null;
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                ingredients={props.ingredients}
                checkoutCancel={checkoutCanceledHandler}
                checkoutContinue={checkoutContinueHandler}
                />
                <Route 
                    path={props.match.url + '/contact-data'} 
                    render={ (propsPassed) => 
                        <ContactData 
                            ingredients={props.ingredients} 
                            totalPrice={props.totalPrice}
                            {...propsPassed}/>
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

const mapStateToProps = ({burger, order}) => {
    return {
        ingredients: burger.ingredients,
        totalPrice: burger.totalPrice,
        purchased: order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);