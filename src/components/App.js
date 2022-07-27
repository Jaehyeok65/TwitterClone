import React, { useEffect, useState } from "react";
import Routers from "./Routers";
import mybase from "../mybase";

function App() {

  const auth = mybase.auth();
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  useEffect( () => {
    auth.onAuthStateChanged( (user) => {
      if(user) {
        setUser(user);
      }
      setInit(true);
    })
  },[])


  return (
    <>
    {init ? <Routers isLogin={Boolean(user)} user = {user} /> :  <h2>Initializing...</h2>}
    </>
  );
}

export default App;
