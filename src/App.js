import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
//import use state hook
import { useState } from 'react';
function App() {
  //products property contains data (that we imported)
  const { products } = data;
  //use state to manage cart items. we have cartitems hook and setCartItems is used to change hook(cartItems).
  //default value for cartItems is an empty array
  const [cartItems, setCartItems] = useState([]);

  //Add function, adds quantity to cart
  const onAdd = (product) => {
    //checks to find if cartItems id is equal to the product id being added
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      //update cart items, if product exists find the product in the cart items and
      // increase its quantity by 1
      setCartItems(
        //compare carItems id and product id being added. if theres a match then update that particular
       // matching element/value { the exists variable} and add + 1 to qty
        
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
      //if product doesnt exist already add product to cartItems and make qty = 1
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;
