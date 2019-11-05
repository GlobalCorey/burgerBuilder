import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientList = ingredients.map((ing, i) => {
        return <span 
                    style={{
                        textTransform: 'capitalize', 
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    key={i}>
                    {ing.name}: ({ing.amount})
                </span>
    })
    return(
        <div className={classes.Order}>
            {ingredientList}
            <p>Price: $<strong>{props.price}</strong></p>
        </div>
    )
}

export default order;