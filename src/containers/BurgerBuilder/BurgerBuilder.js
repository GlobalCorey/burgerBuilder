import React, { useState, useEffect } from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as burgerActionCreator from '../../store/actions/burgerActionCreator';
import * as orderActionCreator from '../../store/actions/orderActionCreator';
import { setAuthRedirectPath } from '../../store/actions/authActionCreator';

export const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);

    const ingredients = useSelector((state) => state.burger.ingredients);
    const totalPrice = useSelector((state) => state.burger.totalPrice);
    const error = useSelector((state) => state.burger.error);
    const isAuth = useSelector((state) => state.auth.token !== null);
    
    const { fetchIngredients } = props;

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients])

    const purchaseHandler = () => {
        if(isAuth){
            setPurchasing(true);
        }
        else{
            props.setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinueHandler = () => {
        props.initPurchase();
        props.history.push('/checkout');
    }
    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const disableInfo = {
        ...ingredients
    };
    for(let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burgerAndControls = error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if(ingredients){
        orderSummary =  
            <OrderSummary 
                ingredients={ingredients} 
                price={totalPrice}
                purchaseCancel={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}/>
                        
        burgerAndControls = (
            <Aux>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    isAuthenticated = {isAuth}
                    ingredientAdded = {props.addIngredient}
                    ingredientRemoved = {props.removeIngredient}
                    disabled={disableInfo}
                    price={totalPrice}
                    purchasable={updatePurchaseState(ingredients)}
                    ordered={purchaseHandler}
                />
            </Aux>
            );
    }

    return(
        <Aux>
            <Modal 
                show={purchasing} 
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            
            {burgerAndControls}
        </Aux>
    );
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

//Changed the import order from export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// to below to avoid constant resetting/initializing of axios interceptors due to redux state changes (ingredients, price)
// being passed to the wrapped BurgerBuilder component inside the connect functions.

export default withErrorHandler(connect(null, mapDispatchToProps)(BurgerBuilder), axios);