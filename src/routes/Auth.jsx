import React, { useEffect, useState } from "react";
import mybase from "../mybase";
import { firebaseInstance } from '../mybase';

function Auth() {
    const authService = mybase.auth();

    //const [email, setEmail] = useState(null);
    //const [password, setPassword] = useState(null);
    const [input, setInput] = useState({
        email : '',
        password : ''
    })
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState();


    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })
    }

    const onToggle = () => {
        setNewAccount(prev => !prev);
    }

    const SocialLogin = async(e) => {
        const {name , value} = e.target;
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data = await authService.signInWithPopup(provider);
        console.log(data);



    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount) {
                //계정 생성
                data = await authService.createUserWithEmailAndPassword(input.email, input.password);
            }
            else {
                //로그인
                data = await authService.signInWithEmailAndPassword(input.email,input.password);
            }
            console.log(data);
        }
        catch(error) {
            setError(error.message);
        }
        
        
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='email' name='email' value={input.email} placeholder="email..." onChange={onChange}/>
        <input type='password' name='password' value={input.password} placeholder="password..." onChange={onChange} />
        <input type='submit' value = { newAccount ?  'create Account' : 'Login'} />
        <br/>
        {error}
      </form>
      <span onClick={onToggle}>{ !newAccount ? 'create Account' : 'Login'}</span>
      <br/>
      <button name='google' onClick={SocialLogin}>Login With Google</button>
    </div>
  );
}

export default Auth;
