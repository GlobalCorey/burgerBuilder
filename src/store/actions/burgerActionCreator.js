import * as burgerActionTypes from './burgerActionTypes';

export const addIngredient = (value) => {
    return {
        type: burgerActionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: value
        }
    }
}
export const removeIngredient = (value) => {
    return {
        type: burgerActionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredient: value
        }
    }
}

export const updateTotalPrice = (value) => {
    return {
        type: burgerActionTypes.UPDATE_TOTAL_PRICE,
        payload: value
    }
}