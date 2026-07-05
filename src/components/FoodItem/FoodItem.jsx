import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from '../../redux/slices/cartSlice';
import { toggleWishList, selectWishListItems } from '../../redux/slices/wishListSlice';

const FoodItem = ({id,name,price,description,image}) => {

    const cartItems = useSelector(selectCartItems);
    const wishListItems = useSelector(selectWishListItems);
    const dispatch = useDispatch();

    const isWishlisted = wishListItems.includes(id);

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className='food-item-image' src={image} alt="" />
            <div className="food-item-wishlist-icon" onClick={() => dispatch(toggleWishList(id))}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill={isWishlisted ? "tomato" : "rgba(0,0,0,0.3)"} stroke={isWishlisted ? "tomato" : "white"} strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            {!cartItems[id]
                ? <img className='add' onClick={()=>dispatch(addToCart(id))} src={assets.add_icon_white} alt="" />
                : <div className="food-item-counter">
                    <img onClick={()=>dispatch(removeFromCart(id))} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>dispatch(addToCart(id))} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
  )
}

export default FoodItem

