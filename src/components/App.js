import React from "react";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLiggedIn] = useState(false);

  return <AppRouter isLoggedIn={isLoggedIn}/>;
}

export default App;
