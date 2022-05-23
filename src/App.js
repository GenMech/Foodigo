import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
   
  const [cartIsShown, setCartIsShown] = useState(false);

  //My initial state is false bcs thats my cartIsShown state and we also have a setCartSHown function
  
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {/* It will render <Cart/> is cartIsShown is true and will not render if it turns out to be false */}
      {cartIsShown && <Cart onClose={hideCartHandler}/>}

      <Header onShowCart={showCartHandler}/>
      {/* Just a prop pointer , just point it so that it can be executed from inside header */}
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
