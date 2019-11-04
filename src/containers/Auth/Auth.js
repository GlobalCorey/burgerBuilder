import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as authActionCreator from '../../store/actions/authActionCreator';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import burger from '../../components/Burger/Burger';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignUp: false
    }
    
    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                validation: {
                    ...this.state.controls[controlName].validation,
                    valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
                },
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    switchAuthType = () => {
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath('/');
        }
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let userAuthenticationType = <p>Log into account.</p>;
        if(this.state.isSignUp){
            userAuthenticationType = <p>Create new account.</p>
        }


        let form = <Spinner/>
        let redirect = null;
        if(this.props.isAuth){
           redirect =<Redirect to={this.props.authRedirectPath}/>
        }
        if(!this.props.loading){
            form = formElementArray.map(element => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig}
                    elementTouched={element.config.touched}
                    value={element.config.value}
                    invalid={!element.config.validation.valid}
                    shouldValidate={element.config.validation}
                    changed={(event) => this.inputChangedHandler(event, element.id)}
                />
                
            ));
        }
        

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {redirect}
                    {errorMessage}
                    {userAuthenticationType}
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthType}
                    btnType='Danger'>SWITCH TO {this.state.isSignUp ? 'LOGIN' : 'SIGNUP'} 
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({auth, burger}) => {
    return {
        loading: auth.loading,
        error: auth.error,
        isAuth: auth.token !== null,
        authRedirectPath: auth.authRedirectPath,
        building: burger.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActionCreator.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(authActionCreator.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);