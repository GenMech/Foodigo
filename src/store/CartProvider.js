import { useReducer } from "react";


import CartContext from "./cart-context";

const defaultCartState =  {
    items: [], // No items hence empty array
    totalAmount: 0
};

// The action will be dispatched by us later and state is the last state snapshot of the state managed by reducer

const cartReducer = (state , action) => {
    if(action.type === 'ADD'){
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
         
        // where i copy existingCartItem and updated amount bcz amount now needs to be changed
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            // new array where i am copying the existing items so that i update this immutibily without editing old array in memory
            updatedItems = [...state.items];

            //we pick old item and updated it with new 
            updatedItems[existingCartItemIndex] = updatedItem;
        } else{
            updatedItems = state.items.concat(action.item);
        }
        
        return{
            items: updatedItems,
            totalAmount: updateTotalAmount
        };
    }
    if (action.type === 'REMOVE'){
        // we know found the index of the existing item
        const existingCartItemIndex = 
        state.items.findIndex(
            (item) => item.id === action.id
        );
        // to find item itself we do 
        const existingItem = state.items[existingCartItemIndex];
        // to update amount
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        
        let updatedItems;
        // if the amount of item is less than 1 then we have to remove the item completely from cart
        if(existingItem.amount === 1){
            // we will be passing function in filter of every item in array
            // in this check we see if id is not equal to action.id then item will be kept but for that one item if this comes out to be false then filter will give us a array without that item 
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    // we know that useReducer returns an array with exactly two elements
    // First element will always our state snapshot and second elemnt is function which allows us to dipatch an action to reducer

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const clearCartHandler = () => {
        dispatchCartAction({type:'CLEAR'});
    }

    //Now cartContext will be dynamic which will change values on logic (on adding and subtracting)
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
    

 };

 export default CartProvider;