import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import LoginPage from "./components/LoginPage";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./components/StateProvider";
import Payment from "./components/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

function App() {
  const [{}, dispatch] = useStateValue();

  // const stripe=useStripe();
  // const elements=useElements();

  const promise =loadStripe('pk_test_51LZ9rPSEhC4BN80BMuqa2ZGr9ofwQJDM6Wq4P7RJyOFKQYgotUBGE0H8Hrtz4nH4jJMVDp4ZQJpGywujLnCUWblI00wDD0skOw');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // gives data whnenver state is changed

      if (authUser) {
        // state of user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []); // this will run 1 time only

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Header /> <Home />{" "}
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                {" "}
                <Header /> <Checkout />{" "}
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<> <Header/> <Elements stripe={promise}>  <Payment/> </Elements>  </>}/>  
         <Route path='/orders' element={ <Orders/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
