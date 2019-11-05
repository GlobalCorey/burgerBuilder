import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: (state.ingredients[action.payload.ingredient] > 0) ? (state.ingredients[action.payload.ingredient] -1) : 0
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
                building: true
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.INIT_INGREDIENTS: {
            return{
                ...state,
                ingredients: action.payload,
                totalPrice: 4,
                error: false,
                building: false
            }
        }
        default:
            return state;
    }
}

export default burgerBuilderReducer;