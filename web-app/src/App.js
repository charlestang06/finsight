import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { UNAUTHORIZED } from "./Utils/UserStates";
import { auth } from "./Firebase";

import Login from "./Authorization/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import authContext from "./Components/AuthContext/AuthContext";
import RequestUtils from "./Utils/RequestUtils";

function App() {
  const [userImpl, setUserImpl] = useState(null);
  const [authImpl, setAuthImpl] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserImpl(user);
        setAuthImpl(user);
      } else {
        setUserImpl(UNAUTHORIZED);
        setAuthImpl(UNAUTHORIZED);
      }
    });
  }, []);


  return (
    <>
      {userImpl != null && userImpl != "unathorized" ? (
        <authContext.Provider
          value={{ userImpl, setUserImpl, authImpl, setAuthImpl }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </authContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}


export default App;