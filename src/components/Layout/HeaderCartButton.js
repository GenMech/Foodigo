import { useContext, useEffect, useState} from 'react';

import CartICON from '../Cart/CartICON';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = props => {
  
  const [btnIsHighlighted, setBtnIsHighlighted ] = useState(false);
  const cartCtx = useContext(CartContext);
   
  // object destructuring to pull out items of cartCtx
  const { items } = cartCtx;

  //  Reduce is a built in method, it allows us to tranform our data into single value 
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
    
   const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    
    useEffect(() => {
      if(items.length === 0){
        return;
      }
      setBtnIsHighlighted(true);
      
      // Function to bump cart button everytime we add item before this it bump only once at starting
      const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);
       
      return() => {
        clearTimeout(timer);
      };
    }, [items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
          {/* Icon */} 
            <span className={classes.icon}>
                <CartICON/>
            </span>
          {/* Text */} 
            <span>
                Your Cart
            </span>
          {/* Badge(Total amount of items in Cart) */}
            <span className={classes.badge}>
                {/* For a moment we don't have to logic to count so random Number */} {numberOfCartItems}
                {/* Now we done dynamic */}
            </span> 
        </button>
    )
};

export default HeaderCartButton;