import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    //excludes the invalid inputType from being applied to html tags
    // input, textarea which cannot use them
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.elementTouched){
        inputClasses.push(classes.Invalid);
    }
    let inputElement = null;
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select className={classes.InputElement}  
                        onChange={props.changed}>
                        {props.elementConfig.options.map(options => {
                            return <option 
                                        key={options.value} 
                                        value={options.value}>
                                    {options.displayValue}
                                    </option>
                        })}
                </select>
            )
            break;
        default:
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.lable}</label>
            {inputElement}
        </div>
    )
};

export default input;