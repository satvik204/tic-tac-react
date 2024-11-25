import React, { useState } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie'

const Signup = ({setisAuth}) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    const SignUp = () => {



        
        Axios.post("https://tictactoe-4qkd.onrender.com/signup",user).then((res) => {

          console.log(res.data);
          
          const {token,userId,firstname,lastname,username,hashedPassword} = res.data;
               console.log(token,userId,firstname,lastname,username,hashedPassword);
               
          cookies.set("token",token);
          cookies.set("userId",userId);
          cookies.set("firstname",firstname);
          cookies.set("lastname",lastname);
          cookies.set("username",username);
          cookies.set("hashedPassword",hashedPassword);
          setisAuth(true);
        })
    }
  return (
    <div className='Signup'>
        <label>Signup</label>
        <input placeholder='First Name' onChange={(event) => {
                  setUser({...user, firstname: event.target.value});
        }}/>

<input placeholder='Last Name' onChange={(event) => {
                  setUser({...user, lastname: event.target.value});
        }}/>

<input placeholder='Username' onChange={(event) => {
                  setUser({...user, username: event.target.value});
        }}/>

<input placeholder='Password' type='password' onChange={(event) => {
                  setUser({...user, password: event.target.value});
        }}/>

        <button onClick={SignUp}>Signup</button>
        </div>
  )
}

export default Signup