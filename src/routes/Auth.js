import React, { useState } from "react";
import { authService, firebaseInstance } from "../firebaseJS";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: {name, value}
    } = e;
    if(name === "email") {
      setEmail(value);
    } else if(name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let data;

      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch(error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocailClick = async(e) => {
    const {
      target:{name}
    } = e;

    // 초기화 오류 : = ""; 까지 선언해주어야함(지정해주어야함)
    let provider = "";

    if(name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
      <div>
        <button
          name="google"
          onClick={onSocailClick}
        >
          Continue with Google
        </button>
        <button
          name="github"
          onClick={onSocailClick}
        >
          Continue with Github
        </button>
      </div>
    </div>
  )
}

export default Auth;