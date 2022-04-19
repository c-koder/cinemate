import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navigation from "../components/navigation.component";
import { AuthContext } from "../helpers/AuthContext";

import Home from "../pages/home.page";
import Login from "../pages/login.page";
import MovieDetails from "../pages/movieDetails.page";
import Movies from "../pages/movies.page";
import Profile from "../pages/profile.page";
import Register from "../pages/register.page";

import { getCurrentUser } from "../services/auth.service";

const Routing = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = getCurrentUser();

  useEffect(() => {
    user && setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/explore" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/saved" />
          <Route
            exact
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/register"
            element={currentUser ? <Navigate to="/" /> : <Register />}
          />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default Routing;
