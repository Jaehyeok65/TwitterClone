import React, { useEffect, useState } from "react";
import { dbService } from "../mybase";
import Hweet from "../components/Hweet";
import Create from "../components/Create";
import '../App.css';

function Home( { user }) {

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
  
  return (
    <div> 
     <Create user = {user}/>
      <div>
        {hweets.map((hweet) => (
          <Hweet key={hweet.id} hweet={hweet} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Home;
