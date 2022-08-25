import React, { useState } from 'react'
import './Login.css'
import { NavLink ,useNavigate} from "react-router-dom";
import { Autorenew } from '@material-ui/icons';
import { auth } from '../firebase';

function LoginPage() {

 const [email, setEmail] = useState([]);
 const [password, setPassword] = useState([]);
 const navigate =useNavigate();


  const signIn = e =>{
    e.preventDefault(); // prevent from refreshing
    auth.signInWithEmailAndPassword(email,password)
    .then((auth)=>{
      if(auth){
        navigate('/');
      }
      
    })

  }

  const register = e=>{
    auth.createUserWithEmailAndPassword(email,password)
    .then(auth=>{
      
      if(auth){
        navigate('/');
      }
    })
    .catch(error=>alert(error.message));
    
  }

  return (
    <div className='login'>
   <NavLink to="/">

     <img className='login_image' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>    
    </NavLink>
    <div className='login_container'>
   <h1>Sign in</h1>
   <form>
    <h5>E-mail</h5>
    <input type='text' value={email} onChange={e=>{setEmail(e.target.value)} }/> 
    <h5>Password</h5>
    <input type='password' value={password} onChange={e=>{setPassword(e.target.value)} }/> 
    <button type='submit' className='login_signInButton' onClick={signIn}>Sign In</button>
   </form>
   <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login_registerButton' onClick={register}>Create your Amazon Account</button>

         </div>
    


    </div>
  )
}

export default LoginPage