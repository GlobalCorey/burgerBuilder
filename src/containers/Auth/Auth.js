import React, { useState, useEffect } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as authActionCreator from '../../store/actions/authActionCreator';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../utility/utility';

const Auth = (props) => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
                valid: false
            },
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 7,
                valid: false
            },
            touched: false
        }
    })
    const [isSignUp, setIsSignUp] = useState(false);

    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const isAuth = useSelector((state) => state.auth.token !== null);
    const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);
    const building = useSelector((state) => state.burger.building);
    
    const dispatch = useDispatch();

    const inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                validation: {
                    ...controls[controlName].validation,
                    valid: checkValidity(event.target.value, controls[controlName].validation)
                },
                touched: true
            }
        }
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(authActionCreator.auth(controls.email.value, controls.password.value, isSignUp))
    }

    const switchAuthType = () => {
        setIsSignUp(!isSignUp);
    }

    useEffect(() => {
        if(!building && authRedirectPath !== '/'){
            dispatch(authActionCreator.setAuthRedirectPath('/'));
        }
    }, [dispatch, building, authRedirectPath])

    const formElementArray = [];
    for(let key in controls){
        formElementArray.push({
            id: key,
            config: controls[key]
        })
    }

    let errorMessage = null;
    if(error){
        errorMessage = (
            <p>{error.message}</p>
        )
    }

    let userAuthenticationType = <p>Log into account.</p>;
    if(isSignUp){
        userAuthenticationType = <p>Create new account.</p>
    }

    let form = <Spinner/>
    let redirect = null;
    if(isAuth){
        redirect =<Redirect to={authRedirectPath}/>
    }
    if(!loading){
        form = formElementArray.map(element => (
            <Input
                key={element.id}
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig}
                elementTouched={element.config.touched}
                value={element.config.value}
                invalid={!element.config.validation.valid}
                shouldValidate={element.config.validation}
                changed={(event) => inputChangedHandler(event, element.id)}
            />
            
        ));
    }

    return (
        <div className={classes.Auth}>
            <form onSubmit={submitHandler}>
                {redirect}
                {errorMessage}
                {userAuthenticationType}
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button 
                clicked={switchAuthType}
                btnType='Danger'>SWITCH TO {isSignUp ? 'LOGIN' : 'SIGNUP'} 
            </Button>
        </div>
    );
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (email, password, isSignUp) => dispatch(authActionCreator.auth(email, password, isSignUp)),
//         onSetAuthRedirectPath: (path) => dispatch(authActionCreator.setAuthRedirectPath(path))
//     }
// }

export default Auth;