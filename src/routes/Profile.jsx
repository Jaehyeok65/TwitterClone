import React from "react";
import { useHistory } from "react-router-dom";
import mybase from "../mybase";

function Profile() {

    const history = useHistory();
    
    const onLogout = () => {
        const authService = mybase.auth();
        authService.signOut();
        history.push('/');
    }


  return (
    <>
    <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default Profile;
