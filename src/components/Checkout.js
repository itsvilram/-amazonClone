import React from "react";
import './checkout.css'
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";


function Checkout() {
  const [{basket,user}, dispatch] = useStateValue();
  const productProperty ="Remove item from Basket";

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_left_image"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        ></img>
        <div className="checkout_title">
          <h3> Hello,{user?.email}</h3>
            <h1>All your products are here</h1>
        </div>
        <div className="checkout_product">
       
        {basket.map(item => (
          <Product
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          bottonProperty={productProperty}

          />
          ))}
          </div>

          
       
        
      </div>

      <div  className="checkout_right">
        <Subtotal/>
      </div>
    </div>
  );
}

export default Checkout;
