import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActionCreator from '../../../store/actions/orderActionCreator';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../utility/utility';

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
     
        const formData = {}
        for(let elementIdentifier in this.state.orderForm){
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        console.log(typeof this.props.totalPrice)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        };
        this.props.orderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const newOrderFormElement = {
            ...newOrderForm[inputIdentifier]
        };
        newOrderFormElement.validation.valid = checkValidity(event.target.value, newOrderFormElement.validation)
        newOrderFormElement.value = event.target.value;
        newOrderFormElement.touched = true;
        newOrderForm[inputIdentifier] = newOrderFormElement;

        let formIsValid = true;
        for(let inputIdentifier in newOrderForm){
            formIsValid = newOrderForm[inputIdentifier].validation.valid && formIsValid;
        }

        this.setState({
            orderForm: newOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        })
        let form = <Spinner/>
        if(!this.props.loading){
            form = (
                <form onSubmit={this.orderHandler}>
                    {inputComponents}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));