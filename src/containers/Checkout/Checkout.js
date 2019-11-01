import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route } from 'react-router-dom';
// import queryString from 'querystring';
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
        return (
            <div>
                {this.props.ingredients !== null && 
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancel={this.checkoutCanceledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        render={ (props) => <ContactData 
                                            ingredients={this.props.ingredients} 
                                            totalPrice={this.props.totalPrice}
                                            {...props}/>
                                }
                    />
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);