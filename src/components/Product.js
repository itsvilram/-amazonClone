import React from "react";
import "./product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, rating, image, bottonProperty }) {
  const [{ basket }, dispatch] = useStateValue();

  const onClickHandle = () => {
    if (bottonProperty === "Add") addToBasket();
    else removeFromBasket();
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",

      id: id,
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small> ₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
          <p>Rating</p>
        </div>
      </div>

      <img src={image} />
      <button onClick={onClickHandle}> {bottonProperty}</button>
    </div>
  );
}
export default Product;
