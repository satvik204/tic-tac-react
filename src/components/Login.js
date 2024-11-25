import React, { useState } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie'

const Login = ({setisAuth}) => {
      const cookies = new Cookies();

     const [userName, setUserName] = useState("");
     const [passWord, setPassWord] = useState("");

        const Login = () => {
          
            Axios.post("https://tictactoe-4qkd.onrender.com/login",{userName,passWord}).then((res) => {

                  console.log(res.data);
                  
                  const {token,firstname,lastname,userId,userName} = res.data;
                       
                  cookies.set("token",token);
                  cookies.set("userId",userId);
                  cookies.set("firstname",firstname);
                  cookies.set("lastname",lastname);
                  cookies.set("username",userName);
                  setisAuth(true);
                })
        }
  return (
        <div className='login'>
        <label>Login</label>
<input placeholder='Username' onChange={(event) => {
                  setUserName(event.target.value);
        }}/>

<input placeholder='Password' type='password' onChange={(event) => {
                  setPassWord(event.target.value);
        }}/>

        <button onClick={Login}>login</button>
        </div>
  )
}

export default Login