import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { useSelector } from 'react-redux';

const Checkout = (props) => {

    const ingredients = useSelector((state) => state.burger.ingredients);
    const totalPrice = useSelector((state) => state.burger.totalPrice);
    const purchased = useSelector((state) => state.order.purchased);

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data')
        
    }
    
    let summary = <Redirect to='/'/>;
        
    if(ingredients){
        const purchaseRedirect = purchased ? <Redirect to='/'/> : null;
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                ingredients={ingredients}
                checkoutCancel={checkoutCanceledHandler}
                checkoutContinue={checkoutContinueHandler}
                />
                <Route 
                    path={props.match.url + '/contact-data'} 
                    render={ (propsPassed) => 
                        <ContactData 
                            ingredients={ingredients} 
                            totalPrice={totalPrice}
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

export default Checkout;