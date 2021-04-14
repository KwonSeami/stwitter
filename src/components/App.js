import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "firebaseJS";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLiggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect (() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLiggedIn(true);
        setUserObj(user);
      } else {
        setIsLiggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
         "Initializing..."
      )}
      <footer>&copy; Stwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
