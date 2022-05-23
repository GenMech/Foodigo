import { useContext } from 'react';

import classes from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';
import CartContext from '../../../store/cart-context';

const MealsItem = (props) => {
    const cartCtx = useContext(CartContext);

    const price = `\u20B9${props.price.toFixed(2)}`;

    const addItemToCartHandler = amount =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });

    };

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
               <MealsItemForm 
               id = {props.id} 
               onAddToCart = {addItemToCartHandler}/>
            </div>
        </li>
    )
};

export default MealsItem;