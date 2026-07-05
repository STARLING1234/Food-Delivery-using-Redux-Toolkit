import React from 'react'
import './Wishlist.css'
import { useSelector } from 'react-redux'
import { selectWishListItems } from '../../redux/slices/wishListSlice'
import { selectFoodList } from '../../redux/slices/cartSlice'
import FoodItem from '../../components/FoodItem/FoodItem'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
  const wishListItems = useSelector(selectWishListItems)
  const foodList = useSelector(selectFoodList)
  const navigate = useNavigate()

  const wishlistedFoods = foodList.filter((item) => wishListItems.includes(item._id))

  return (
    <div className='wishlist-page'>
      <div className="wishlist-header">
        <h2>Your Wishlist</h2>
      </div>
      {wishlistedFoods.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty.</p>
          <button onClick={() => navigate('/')}>Explore Dishes</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistedFoods.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist;
