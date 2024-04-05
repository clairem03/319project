import React, { useState, useEffect } from "react";
import items from "./products.json";
import "bootstrap/dist/css/bootstrap.css";

const ShoppingApp = () => {
  // State for showing cart view, browse view, or confirmation view
  const [view, setView] = useState("browse");

  // State for storing items in the cart
  const [cart, setCart] = useState([]);

  // State for storing the total price of items in the cart
  const [cartTotal, setCartTotal] = useState(0);

  // State for handling search input
  const [searchQuery, setSearchQuery] = useState("");

  // Function to add item to cart
  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  // Function to remove item from cart
  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  // Function to toggle between views
  const goToCart = () => {
    setView("cart");
  };

  const goToConfirmation = () => {
    setView("confirmation");
  };

  const goBackToCart = () => {
    setView("cart");
  };

  // Calculate total cart value
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cart]);

  //counts how many of this id in the cart
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const listItems = filteredItems.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={el.image} />
        </div>
        <div class="col">
          <div class="row text-muted">{el.title}</div>
          <div class="row">{el.category}</div>
        </div>
        <div class="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(el)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div class="col">
          ${el.price} <span class="close">&#10005;</span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

// JSX for cart view
const cartView = (
  <div className="container">
    <h2>Shopping Cart</h2>
    <button className="btn btn-primary" onClick={() => setView("browse")}>
      Back to Browse
    </button>
    {cart.map((item) => (
      <div className="row" key={item.id}>
        <div className="col-md-4">
          <img
            className="img-fluid"
            src={item.image}
            alt={item.title}
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col">{item.title}</div>
            <div className="col">${item.price}</div>
            <div className="col">
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
    <p>Total: ${cartTotal}</p>
    <div className="checkout-form">
      <h3>Checkout</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
          <input type="text" className="form-control" id="cardNumber" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Shipping Address</label>
          <textarea className="form-control" id="address" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Place Order</button>
      </form>
    </div>
  </div>
);


  // JSX for confirmation view
  const confirmationView = (
    <div className="container">
      <h2>Confirmation</h2>
      <p>Your order has been confirmed!</p>
      <button className="btn btn-primary" onClick={goBackToCart}>
        Back to Cart
      </button>
    </div>
  );

  // JSX for browse view
  const browseView = (
    <div>
      STORE SE/ComS319
      <div class="card">
        <div class="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>319 Shopping Cart</b>
                  </h4>
                  {/* Search bar */}
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div class="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
                <div>
                  <button className="btn btn-primary" onClick={goToCart}>
                    Cart
                  </button>
                </div>
              </div>
            </div>
            <div>{listItems}</div>
          </div>
          <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal">${cartTotal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Determine which view to render based on the 'view' state
  let currentView;
  if (view === "browse") {
    currentView = browseView;
  } else if (view === "cart") {
    currentView = cartView;
  } else if (view === "confirmation") {
    currentView = confirmationView;
  }

  return <div>{currentView}</div>;
};

export default ShoppingApp;
