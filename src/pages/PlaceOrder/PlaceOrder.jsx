import React, { useState } from 'react'
import './PlaceOrder.css'
import { useSelector } from 'react-redux'
import { selectCartTotalAmount, selectCartItems, selectFoodList } from '../../redux/slices/cartSlice'

const PlaceOrder = () => {
  const cartItems = useSelector(selectCartItems)
  const food_list = useSelector(selectFoodList)
  const subtotal = useSelector(selectCartTotalAmount)
  const deliveryFee = subtotal > 0 ? 2 : 0
  const total = subtotal + deliveryFee

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handlePlaceOrder = (event) => {
    event.preventDefault()

    // 1. Gather Cart Items details
    let orderItemsText = ''
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItemsText += `- ${item.name} x ${cartItems[item._id]} ($${item.price * cartItems[item._id]})\n`
      }
    })

    if (!orderItemsText) {
      alert("Your cart is empty!")
      return
    }

    // 2. Build WhatsApp message text
    const message = `*New Food Delivery Order!* 🍔🍕\n\n` +
      `*Delivery Information:*\n` +
      `• Name: ${formData.firstName} ${formData.lastName}\n` +
      `• Email: ${formData.email}\n` +
      `• Address: ${formData.street}, ${formData.city}, ${formData.state}, ${formData.country} - ${formData.zipCode}\n` +
      `• Phone: ${formData.phone}\n\n` +
      `*Items Ordered:*\n${orderItemsText}\n` +
      `*Payment breakdown:*\n` +
      `• Subtotal: $${subtotal}\n` +
      `• Delivery Fee: $${deliveryFee}\n` +
      `• *Total Amount: $${total}*\n\n` +
      `Thank you for ordering with us!`;

    // 3. Construct WhatsApp Redirect Link
    const whatsappNumber = "916374817043"
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`

    // 4. Redirect to WhatsApp (opens in new tab/app)
    window.open(whatsappUrl, '_blank')
  }

  return (
    <form onSubmit={handlePlaceOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder='First Name' required />
          <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder='Last Name' required />
        </div>
        <input type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder='Email address' required />
        <input type="text" name="street" value={formData.street} onChange={onChangeHandler} placeholder='Street' required />
        <div className="multi-fields">
          <input type="text" name="city" value={formData.city} onChange={onChangeHandler} placeholder='City' required />
          <input type="text" name="state" value={formData.state} onChange={onChangeHandler} placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" value={formData.zipCode} onChange={onChangeHandler} placeholder='Zip code' required />
          <input type="text" name="country" value={formData.country} onChange={onChangeHandler} placeholder='Country' required />
        </div>
        <input type="text" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder='Phone' required />
      </div>
      <div className="place-order-right">
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
            <div className="place-order-total-details cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder


