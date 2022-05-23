import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealsItemForm.module.css';

const MealsItemForm = (props) => {
   const [amountIsValid, setAmountIsValid] = useState(true);
   const amountInputRef = useRef();

   const submitHandler = event => {
     event.preventDefault();

     const enteredAmount = amountInputRef.current.value;
     // amountInputRef will point the input element then every input element have default value property that hold the current value 

     const enteredAmountNumber = +enteredAmount;
     // To convert string number to number number

     if(
       enteredAmount.trim().lenght === 0 || 
       enteredAmount < 1 ||
       enteredAmount > 5
     ) {
       setAmountIsValid(false);
       return;
       }

      props.onAddToCart(enteredAmountNumber); 
  };


    return(
        <form className={classes.form} onSubmit={submitHandler}>
          <Input
             ref={amountInputRef}
             label="Quantity"
             input={{
                 id:'amount' + props.id,
                 type: 'number',
                 min: '1',
                 max: '6',
                 step: '1',
                 defaultValue: '0',
            }}
          />
          <button>+ Add</button>
          {!amountIsValid && <p>Please enter Valid Amount</p>}
        </form>
    );
};

export default MealsItemForm;