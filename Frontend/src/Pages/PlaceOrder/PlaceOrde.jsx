import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Content/StoreContent';

const PlaceOrder = () => {
  const {
    cartItems,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2.00;
  const total = subtotal + deliveryFee;

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input 
            type="text" 
            placeholder="First Name"
          />
          <input 
            type="text" 
            placeholder="Last Name"
          />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Street" />
        
        <div className="multi-field">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        
        <div className="multi-field">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        
        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{subtotal.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{deliveryFee.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{total.toFixed(2)}</b>
            </div>
          </div>
        </div>
        <button>CHECKOUT</button>
      </div>
    </form>
  );
}

export default PlaceOrder;
