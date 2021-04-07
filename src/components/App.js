import React, { useState } from "react";
import AppRouter from "components/Router";
import {authService} from "firebaseJS";

function App() {

  const [isLoggedIn, setIsLiggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Stwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
