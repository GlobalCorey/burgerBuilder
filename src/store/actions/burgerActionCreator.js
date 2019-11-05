import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (value) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: value
        }
    }
}
export const removeIngredient = (value) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredient: value
        }
    }
}

const initIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        payload: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-a26b6.firebaseio.com/ingredients.json')
        .then(result => {
            dispatch(initIngredients(result.data));
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed());
        })
    }
}