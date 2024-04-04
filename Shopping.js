import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shopping = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Function to add item to cart
  const addToCart = (el) => {
    setCart([...cart, el]);
    console.log("item added");
  };

  // Function to remove item from cart
  const removeFromCart = (el) => {
    const updatedCart = cart.filter((item) => item.id !== el.id);
    setCart(updatedCart);
  };

  // Function to calculate total cart value
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CSS style for images
  const imageStyle = {
    maxWidth: "100px", // Adjust the maximum width as needed
    maxHeight: "100px", // Adjust the maximum height as needed
  };

  //adds the total cost of all items in the chart
  useEffect(() => {
    total();
  }, [cart]);
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  //show the contents of the cart
  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={150} />
      {el.title}${el.price}
    </div>
  ));

  // JSX for list of items
  const itemList = filteredItems.map((el) => (
    <div key={el.id}>
      {/* Display item information */}
      <h3>{el.title}</h3>
      <img src={el.image} alt={el.title} style={imageStyle} />
      <p>Price: ${el.price}</p>
      {/* Add to cart button */}
      <button type="button" onClick={() => addToCart(el)}>
        +
      </button>
      <button type="button" onClick={() => removeFromCart(el)}>
        -
      </button>
    </div>
  ));

  return (
    <div>
      <h2>Product Catalog</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {/* Display items */}
      {itemList}
      {/* Cart total */}
      <div>
        <h3>Cart Total: ${cartTotal}</h3>
      </div>
    </div>
  );
};

export default Shopping;
