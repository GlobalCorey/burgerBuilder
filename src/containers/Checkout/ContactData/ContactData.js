import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActionCreator from '../../../store/actions/orderActionCreator';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../utility/utility';

const ContactData = (props) => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
                valid: false
            },
            touched: false
        },
        steet: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Address'
            },
            value: '',
            validation: {
                required: true,
                valid: false
            },
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zipcode'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                valid: false
            },
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
                valid: false
            },
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                valid: false
            },
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            validation:{
                valid: true
            }
        }
    })
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
     
        const formData = {}
        for(let elementIdentifier in orderForm){
            formData[elementIdentifier] = orderForm[elementIdentifier].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice.toFixed(2),
            orderData: formData,
            userId: props.userId
        };
        props.orderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const newOrderForm = {
            ...orderForm
        };
        const newOrderFormElement = {
            ...newOrderForm[inputIdentifier]
        };
        newOrderFormElement.validation.valid = checkValidity(event.target.value, newOrderFormElement.validation)
        newOrderFormElement.value = event.target.value;
        newOrderFormElement.touched = true;
        newOrderForm[inputIdentifier] = newOrderFormElement;

        let isValid = true;
        for(let inputIdentifier in newOrderForm){
            isValid = newOrderForm[inputIdentifier].validation.valid && isValid;
        }
 
        setOrderForm(newOrderForm);
        setFormIsValid(isValid);
    }

    const formElementArray = [];
    for(let key in orderForm){
        formElementArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    const inputComponents = formElementArray.map(formElement => {
        return <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                elementTouched={formElement.config.touched}
                value={formElement.config.value}
                invalid={!formElement.config.validation.valid}
                shouldValidate={formElement.config.validation}
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
    })
    let form = <Spinner/>
    if(!props.loading){
        form = (
            <form onSubmit={orderHandler}>
                {inputComponents}
                <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
            </form>
        )
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = ({order, auth}) => {
    return {
        loading: order.loading,
        token: auth.token,
        userId: auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderBurger: (order, token) => dispatch(orderActionCreator.orderBurger(order, token))
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(ContactData), axios);