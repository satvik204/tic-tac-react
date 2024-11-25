import React, { useState, useTransition } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {StreamChat} from 'stream-chat'
import{Chat} from 'stream-chat-react' 
import Cookies from 'universal-cookie'
import Game from './components/joinGame'
import './App.css'
const App = () => {
  const cookies = new Cookies();
  const api_Key = "vvv4hs9qpdu9";
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_Key);
const [isAuth, setisAuth] = useState(false);

const logout = () => {
cookies.remove("userId")
cookies.remove("username")
cookies.remove("firstname")
cookies.remove("lastname")
cookies.remove("hashedPassword")
cookies.remove("token")
cookies.remove("channelname");
client.disconnectUser();
setisAuth(false);

}
  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstname"),
      lastname: cookies.get("lastname"),
      hashedPassword: cookies.get("hashedPassword")
    },token).then(user=> {
      setisAuth(true);
      
    })
  }
  return (
    <div className='app'>
      {isAuth ? (<Chat client={client}><div className='flex'><Game /> <button className='logout' onClick={logout}>Logout</button></div></Chat>) : (   
        <>   
      <Signup setisAuth = {setisAuth}/>
      <Login setisAuth = {setisAuth}/>
      </>)}

    </div>
  )
}

export default App