import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const formData = {}
        for(let elementIdentifier in this.state.orderForm){
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };
        axios.post('/orders.json', order)
        .then(result => {
            this.setState({loading: false, purchasing: false})
            this.props.history.push('/');
        })
        .catch(err => {
            this.setState({loading: false, purchasing: false})
            console.log(err);
        })
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

    inputChangedHandler = (event, inputIdentifier) => {
        const newOrderForm = {
            ...this.state.orderForm
        };
        const newOrderFormElement = {
            ...newOrderForm[inputIdentifier]
        };
        newOrderFormElement.validation.valid = this.checkValidity(event.target.value, newOrderFormElement.validation)
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
        if(!this.state.loading){
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


export default ContactData;