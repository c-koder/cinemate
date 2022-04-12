import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../components/navigation.component";

import Login from "../pages/login.page";
import Profile from "../pages/profile.page";
import Register from "../pages/register.page";
import { getCurrentUser } from "../services/auth.service";

const Routing = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLogged, setLogged] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    user && setLogged(true);
    if (isLogged) {
      setCurrentUser(user);
      setLogged(true);
    }
  }, [isLogged]);

  return (
    <Router>
      <Navigation currentUser={currentUser} />
      <Routes>
        <Route exact path="/login" element={<Login setLogged={setLogged} />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Routing;
