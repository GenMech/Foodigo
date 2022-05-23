import React from 'react';

import classes from './Input.module.css';

// For this input prop when its getting used we get a label prop with lable text and input prop which then itself contains a object with configuration data for input
const Input = React.forwardRef((props, ref) => {
    return(
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>
    </div>
  ); 
});

export default Input;