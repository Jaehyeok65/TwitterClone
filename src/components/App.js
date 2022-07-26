import React, { useEffect, useState } from "react";
import Routers from "./Routers";
import mybase from "../mybase";

function App() {

  const auth = mybase.auth();
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect( () => {
    auth.onAuthStateChanged( (user) => {
      if(user) {
        setIsLogin(true);
      }
      else {
        setIsLogin(false);
      }
      setInit(true);
    })
  },[])

  return (
    <>
    <Routers isLogin={isLogin} />
    </>
  );
}

export default App;
