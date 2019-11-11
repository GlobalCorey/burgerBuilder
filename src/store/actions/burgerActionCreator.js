import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
const INGREDIENTS_FIREBASE_URL = 'INSERT_FIREBASE_DB_URL'; //EX: https://<FIREBASE_DB_NAME>.firebaseio.com/ingredients.json

// FIREBASE REALTIME DATABASE RULES
// {
//     /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
//     "rules": {
//       "ingredients": {
//         ".read": true,
//           ".write": true
//       },
//       "orders": {
//         ".read": "auth != null",
//           ".write": "auth != null",
//             ".indexOn": ["userId"]
//       }
      
//     }
//   }

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
        axios.get(INGREDIENTS_FIREBASE_URL)
        .then(result => {
            dispatch(initIngredients(result.data));
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed());
        })
    }
}