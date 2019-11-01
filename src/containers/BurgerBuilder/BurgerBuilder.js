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


class BurgerBuilder extends Component{
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        // error: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-a26b6.firebaseio.com/ingredients.json')
        // .then(result => {
        //     this.props.updateIngredients(result.data);
        //     // this.setState({
        //     //     ingredients: {
        //     //         ...result.data
        //     //     }
        //     // })
        // })
        // .catch(err => {
        //     this.setState({
        //         error: true
        //     })
        // })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
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
        let burgerAndControls = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if(this.props.ingredients){
            orderSummary =  
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    price={this.props.totalPrice.toFixed(2)}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                            
            burgerAndControls = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
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
        if(this.state.loading){
            orderSummary = <Spinner/>;  
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientType) => dispatch(burgerActionCreator.addIngredient(ingredientType)),
        removeIngredient: (ingredientType) => dispatch(burgerActionCreator.removeIngredient(ingredientType)),
        updateTotalPrice: (newPrice) => dispatch(burgerActionCreator.updateTotalPrice(newPrice))
    }
}

const burgerBuilderConnect = connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

export default burgerBuilderConnect;