import { useRef, useState } from 'react';

import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 6;

const Checkout = prop => {

    const [formInputValidity, setFormInputValidity] = useState({
      name: true,
      street: true,
      postal: true,
      city: true
    });
    
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        // its always current that gives us access to actual value stored in ref, eveny input element in js have a value prop that contains actuall value of that element so .value
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity   = cityInputRef.current.value;
        
        // in below statements we are checking validation for our form elements
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChar(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);
        
        setFormInputValidity({
          name: enteredNameIsValid,
          street: enteredStreetIsValid,
          postal: enteredPostalIsValid,
          city: enteredCityIsValid
        }); // we dont need any state updating function here as i am overwriting whole state with brand new objects whre i am assigning new values to every field

        const formIsValid = 
          enteredNameIsValid &&
          enteredStreetIsValid &&
          enteredPostalIsValid &&
          enteredCityIsValid;

          if(!formIsValid){
            
          }

          // submit the cart data
          prop.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity,
          });
    };

    // following is the method to use class on a specific case as we want to call 1 class only when input is invalid
    const nameControlClasses   = `${classes.control} ${formInputValidity.name   ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const postalControlClasses = `${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`;
    const cityControlClasses   = `${classes.control} ${formInputValidity.city   ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formInputValidity.name && <p>Is Your name blank! Please enter valid name</p>}
          </div>
          <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef} />
            {!formInputValidity.street && <p>Please enter a valid street name that exist!</p>}
          </div>
          <div className={postalControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef}/>
            {!formInputValidity.postal && <p>Please enter a valid Postal code (6 Characters)</p>}
          </div>
          <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formInputValidity.city && <p>Please enter a valid city that exist!</p>}
          </div>
           {/* we have connected refs so that we can read all inputs that user have entererd when form submitted */}
          
          <div className={classes.actions}>
            <button type='button' onClick={prop.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
};

export default Checkout;