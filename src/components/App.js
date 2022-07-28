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
        setUser({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args),
        });
      }
      setInit(true);
    })
  },[])

  const refreshUser = () => {
    const user = auth.currentUser;
    setUser({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    });
  }


  return (
    <>
    {init ? <Routers isLogin={Boolean(user)} user = {user} refreshUser={refreshUser} /> :  <h2>Initializing...</h2>}
    </>
  );
}

export default App;
