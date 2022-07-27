import React, { useEffect, useState } from "react";
import { dbService } from "../mybase";
import Hweet from "../components/Hweet";

function Home( { user }) {
  
  const [hweet,setHweet] = useState('');
  const [hweets,setHweets] = useState([]);

  

  useEffect( () => {
    dbService.collection('hweets').onSnapshot( (snapshot) => {
      const hweetArray = snapshot.docs.map((docs) => ({
        id : docs.id,
        ...docs.data()
      }
      ))
      setHweets(hweetArray);
    })
  },[])

  const onChange = (e) => {
    const { value } = e.target;
    setHweet((prev) => value);
  }


  const onSubmit = async(e) => {
    e.preventDefault();
    await dbService.collection('hweets').add( {
      text : hweet,
      created : Date.now(),
      creatorid : user.uid
    })
    setHweet(prev => '');
  }
  //console.log(hweets);
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' value = {hweet} onChange = {onChange}  maxLength={120} placeholder='typing pleaze...'/>
        <input type='submit' value='Hweet' />
      </form>
      <hr />
      <div>
        {hweets.map((hweet) => (
          <Hweet key={hweet.id} hweet={hweet} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Home;
