import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as burgerActionCreator from '../../store/actions/burgerActionCreator';
import * as orderActionCreator from '../../store/actions/orderActionCreator';
import { setAuthRedirectPath } from '../../store/actions/authActionCreator';

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing: true})
        }
        else{
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el;
        }, 0);

        return sum > 0;
    }

    render(){
        const disableInfo = {
            ...this.props.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burgerAndControls = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if(this.props.ingredients){
            orderSummary =  
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    price={this.props.totalPrice}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                            
            burgerAndControls = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        isAuthenticated = {this.props.isAuth}
                        ingredientAdded = {this.props.addIngredient}
                        ingredientRemoved = {this.props.removeIngredient}
                        disabled={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
                );
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                
                {burgerAndControls}
            </Aux>
        );
    }
}

const mapStateToProps = ({ burger, auth }) => {
    return {
        ingredients: burger.ingredients,
        totalPrice: burger.totalPrice,
        error: burger.error,
        isAuth: auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientType) => dispatch(burgerActionCreator.addIngredient(ingredientType)),
        removeIngredient: (ingredientType) => dispatch(burgerActionCreator.removeIngredient(ingredientType)),
        fetchIngredients: () => dispatch(burgerActionCreator.fetchIngredients()),
        initPurchase: () => dispatch(orderActionCreator.purchaseInit()),
        setAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
}

const burgerBuilderConnect = connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

export default burgerBuilderConnect;