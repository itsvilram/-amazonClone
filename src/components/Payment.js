import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import Product from "./Product";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./payment.css";
import {
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "../firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [succeeded, setsucceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true); // to know how much we gone charge

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket)*100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("this is clien secre", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault(); // we dont like refreshing
    setprocessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })
     //console.log(paymentIntent.amount);

        setsucceeded(true);
        setError(null);
        setprocessing(null);

        dispatch({
          type: "EMPTY_BASKER",
        });
        navigate("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<NavLink to="/checkout">{basket?.length} Items</NavLink>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery addres</h3>
          </div>
          <div className="payment_address">
            <p> {user?.email}</p>
            <p> village post pichanwa</p>
            <p> district Jhunjhunu</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3> Review Items and Delivery address</h3>
          </div>
          <div className="payment_item">
            {basket.map((item) => (
              <Product
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
                bottonProperty="remove from basket"
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_detail">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} items):{" "}
                        <strong>{value} , value</strong>
                      </p>
                      <small className="subtotal_gift">
                        <input type="checkbox" /> This order contains a gift
                      </small>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span> {processing ? <p>processing</p> : "Buy Now"} </span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
