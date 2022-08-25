import React from "react";
import "../components/header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { NavLink } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <NavLink to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </NavLink>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <img
        className="header_flage"
        src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png"
      />
      <div className="header_nav">
        <NavLink to={!user && "/login"}>
          <div className="header_option" onClick={handleAuthenticaton}>
            <span className="header_optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_optionLineTwo">
              {!user ? "Sign IN" : "Sign Out"}
            </span>
          </div>
        </NavLink>

        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo"> & Orders</span>
        </div>

        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <NavLink to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />

            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
