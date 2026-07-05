import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotalItems } from '../../redux/slices/cartSlice'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("menu");
    const totalItems = useSelector(selectCartTotalItems);

  return (
    <div className="navbar">
      <Link to='/' ><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>
            {totalItems > 0 && <div className="dot">{totalItems}</div>}
        </div>
        <Link to='/wishlist' className="navbar-wishlist-link" style={{ display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#49557e" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </Link>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar

