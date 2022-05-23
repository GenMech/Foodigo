import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal.js';
import CartItem from './CartItem.js';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context.js';
import Checkout from './Checkout.js';

const Cart = (props) =>{

    const [isCheckout, setIsCheckout] = useState(false);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `\u20B9${cartCtx.totalAmount.toFixed(2)}`;

    //function to show order button when there is meal in cart
    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const orderHandler = () => {
        setIsCheckout(true); 
    };
    
    //Below element is to send our cart items and userdata inputed to backend on submit
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://foodigoo-b5728-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }; 

    const cartItems  = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
            // as CartItem is a list we pass all the thing we want to display and funtion
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            // this is somwthing we have done to ensure that our both functions do recieve id and item
            /> ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick = {props.onClose}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>
            Order
        </button>}
        </div>
    );
    
    const cartModalContent = (
        // is jsx no sibling code allowed so we use fragments
        <React.Fragment>
            {cartItems}
        {/* Total amount */}        
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        
        {/* Actions for the Cart*/} 
        {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending your order data....</p>
    const didSubmitModalContent = ( 
           <React.Fragment>
               <h2>Order Placed Successfully!</h2>
               <div className={classes.wrapper}>
               <div className={classes.circle}>
               <div class={classes.checkMark}></div>
               </div>
               </div>
               <div className={classes.actions}>
               <button className={classes.button} onClick = {props.onClose}>Close</button>
               </div>
           </React.Fragment>
        );

    return(
        // we have to show this up in a the modal wrapper rather than div so lets do this

        <Modal onClose={props.onClose}>

            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>

    );
};

export default Cart;