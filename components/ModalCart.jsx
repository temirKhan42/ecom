import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeData } from '../utils/slices/cartSlice.js';


function ModalCart() {
  const {  id, title, cost, amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isCheckDisabled, setIsCheckDisabled] = useState(false);
  const [errorMeasage, setErrorMeasage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (amount > 0) {
        const response = await fetch('/api/product/check-amount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, id }),
        })
        
        const data = await response.json();

        setIsCheckDisabled(!data?.confirmed);
        setErrorMeasage(data?.measage);
      }   
    } 
    fetchData();
  }, [amount]);

  const handleClearCart = (e) => {
    e.preventDefault();
    dispatch(removeData());
  };

  const handleCheck = (e) => {
    e.preventDefault();
    console.log('Send to payment page');
  };

  return (
    <div className="modal-cart flex-column">
      <div>
        <h6>Cart</h6>
      </div>
      { title && amount > 0 ?
        <div className="modal-cart-body">
          <div className="flex jc-sb ai-c mb-1">
            <img style={{width: 50, height: 50}} src="/image-product-1-thumbnail.jpg" alt="Item" />
            <div>
              <p>{title}</p>
              <p>${cost} * {amount} <b>${cost*amount}</b></p>
            </div>
            <img onClick={handleClearCart} className="remove-cart-btn" src="/icon-delete.svg" alt="Delete"  />
          </div>
          <div>
            <button className='check-btn' disabled={isCheckDisabled} onClick={handleCheck}>Checkout</button>
          </div>
          {isCheckDisabled ? <p className="error-measage">{errorMeasage}</p> : null}
        </div> :
        <div className="modal-cart-empty">
          <p>Your cart is empty</p>
        </div>
      }
    </div>
  );
}

export default ModalCart;