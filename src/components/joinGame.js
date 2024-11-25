import React, { useState } from 'react'
import { useChatContext,Channel,ReactionSelector,ReactionsList } from 'stream-chat-react';

import Games from './Gamestatr';
import CustomInput from './CustomInput';
const Game = () => {
  const [rivalUsername, setrivalUsername] = useState("");
  const [channel, setchannel] = useState(null)
  const {client} = useChatContext();

  const createChannel = async () =>{
    const response = await client.queryUsers({name: { $eq : rivalUsername}})
     

    if (response.users.length === 0 ) {
      alert("User not found");
      return;
    }

    const newChannel =  client.channel("messaging",{
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();

    setchannel(newChannel);

  }
  return (
<>  {channel ? (<Channel channel={channel} Input={CustomInput}  ReactionSelector={ReactionSelector}
    ReactionsList={ReactionsList}><Games channel={channel} setchannel = {setchannel}/></Channel>):(
    <div className='joingame'><h4>Create Game or Join Game</h4>
    
    <input placeholder='Enter username of rival...' onChange={(e) => {
      setrivalUsername(e.target.value)
    }}></input>  <button onClick={createChannel}>Create / Join Game</button></div>

)
  }

</>
  
  )
}

export default Game