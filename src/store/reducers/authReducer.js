import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_AUTH_REDIRECT_PATH: {
            return {
                ...state,
                authRedirectPath: action.payload
            }
        }
        case actionTypes.AUTH_START :
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS :
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                loading: false,
                error: null
            }
        case actionTypes.AUTH_FAILED :
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state;
    }
}

export default authReducer;