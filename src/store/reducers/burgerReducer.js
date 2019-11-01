import * as burgerActionTypes from '../actions/burgerActionTypes';

const initialState = {
    ingredients: {
        cheese: 0,
        bacon: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 4
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type){
        case burgerActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient]
            }
        case burgerActionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: (state.ingredients[action.payload.ingredient] > 0) ? (state.ingredients[action.payload.ingredient] -1) : 0
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient]
            }
        case burgerActionTypes.UPDATE_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload
            }
        default:
            return state;
    }
}

export default burgerReducer;