import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
const FIREBASE_SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const FIREBASE_SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const FIREBASE_KEY = 'AIzaSyBQmyArCeWCWq-mz-ta0CLoPf4QXNg7vTw';

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: path
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: localId
        }
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: error
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token || !userId){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000 ));
            }
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
     let url = FIREBASE_SIGNUP_URL;
     if(!isSignUp){
         url = FIREBASE_SIGNIN_URL;
     }
    return dispatch => {
        dispatch(authStart());
        axios.post(url + FIREBASE_KEY, authData)
        .then(result => {
            const expirationData = new Date(new Date().getTime() + result.data.expiresIn * 1000);
            localStorage.setItem('token', result.data.idToken);
            localStorage.setItem('userId', result.data.localId);
            localStorage.setItem('expirationDate', expirationData);
            dispatch(authSuccess(result.data.idToken, result.data.localId));
            dispatch(checkAuthTimeout(result.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFailed(err));
        })
        dispatch(authStart());
    }
}