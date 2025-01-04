import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Content/StoreContent';

const PlaceOrder = () => {
  const {
    cartItems,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2.00;
  const total = subtotal + deliveryFee;

  // Função para gerar o link do WhatsApp
  const generateWhatsAppMessage = () => {
    const { firstName, lastName, email, street, city, state, zipCode, country, phone } = formData;
    const message = `
      *Delivery Information:*
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Address: ${street}, ${city}, ${state}, ${zipCode}, ${country}
      
      *Order Details:*
      Subtotal: $${subtotal.toFixed(2)}
      Delivery Fee: $${deliveryFee.toFixed(2)}
      Total: $${total.toFixed(2)}
      
      *Accompaniments:*
      ${cartItems.map(item => 
        item.acompanhamentos.length > 0 ? 
          item.acompanhamentos.map(extra => `${extra.name} - $${extra.price.toFixed(2)}`).join('\n') : 
          'No extras selected'
      ).join('\n')}
    `;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input 
            type="text" 
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input 
          type="email" 
          placeholder="Email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input 
          type="text" 
          placeholder="Street" 
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          required
        />

        <div className="multi-field">
          <input 
            type="text" 
            placeholder="City" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            placeholder="State" 
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="multi-field">
          <input 
            type="text" 
            placeholder="Zip Code" 
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input 
            type="text" 
            placeholder="Country" 
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <input 
          type="text" 
          placeholder="Phone" 
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p><strong>Price:</strong> ${item.product.price.toFixed(2)}</p>
                <div className="cart-item-extras">
                  {item.acompanhamentos.length > 0 ? (
                    <div>
                      <p><strong>Selected Extras:</strong></p>
                      {item.acompanhamentos.map((extra, i) => (
                        <p key={i}>{extra.name} - ${extra.price.toFixed(2)}</p>
                      ))}
                    </div>
                  ) : (
                    <p>No extras selected</p>
                  )}
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
        </div>

        <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
          <button type="button">Send Order to WhatsApp</button>
        </a>
      </div>
    </form>
  );
};

export default PlaceOrder;
