import React, { useState } from 'react'
import Board from './Board';
import { Window, MessageList, MessageInput, ReactionSelector,ReactionsList } from 'stream-chat-react';
import './Chat.css';
import CustomInput from './CustomInput';



const Games = ({channel,setchannel}) => {
 const [playersJoined, setplayersJoined] = useState(channel.state.watcher_count ===2);
 const [result,setResult] = useState({winner: "none" , state: "none" })
 const [leave, setleave] = useState("none");
 channel.on("user.watching.start",(event) => {
  setplayersJoined(channel.state.watcher_count ===2)
 })
 if (!playersJoined) {
  return <h1>Waiting for other player to join....</h1>
 }
  return (
    <div className='gameContainer'>
      <Board result={result} setResult={setResult}/>    
      <Window><MessageList hideDeletedMessages disableDateSeparator  
     messageActions={["react","edit","delete"]}/>
      <MessageInput/></Window>

      <button onClick={async () => {
        await channel.stopWatching();
      
        setchannel(null)
      }}>Leave Game</button>
    {leave === "true" && <div className='tile'> Opponent Left! You Win!</div>}
    {result.state === "won" && <div className='tile'> {result.winner} Won The Game</div>}
    {result.state === "tie" && <div className='tile'> Game Tied</div>}</div>

 
  )
}

export default Games