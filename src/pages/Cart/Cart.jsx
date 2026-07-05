import React from 'react'
import './Cart.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectFoodList, selectCartTotalAmount, clearFromCart } from '../../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const food_list = useSelector(selectFoodList)
  const subtotal = useSelector(selectCartTotalAmount)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deliveryFee = subtotal > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  const hasItems = subtotal > 0;

  const handleCheckout = () => {
    if (hasItems) {
      navigate('/order')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {!hasItems ? (
          <div className="cart-empty-message">
            <p>No items found. Select item</p>
          </div>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p onClick={()=>dispatch(clearFromCart(item._id))} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocde">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocde-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart


