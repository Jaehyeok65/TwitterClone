import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import mybase, { dbService } from "../mybase";

function Profile( { user, refreshUser }) {

    const history = useHistory();
    const [displayName, setDisplayName] = useState(user.displayName);

    const getHweet = async() => {
      const hweets = await dbService.collection('hweets').where('creatorid', '==', user.uid).get();
      console.log(hweets.docs.map(doc => (
        doc.data()
      )))
    }
    useEffect( () => {
      getHweet();
    },[])
    
    const onLogout = () => {
        const authService = mybase.auth();
        authService.signOut();
        history.push('/');
    }

    const onChange = (e) => {
      const { value} = e.target;
      setDisplayName(value);
    }

    const onSubmit = async(e) => {
      e.preventDefault();
      if(user.displayName !== displayName) {
        await user.updateProfile({
          displayName : displayName
        });
        refreshUser();
      }
    }




  return (
    <>
    <form onSubmit={onSubmit}>
      <input type='text' value={displayName} onChange={onChange} />
      <input type='submit' value='update' />
    </form>
    <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default Profile;
