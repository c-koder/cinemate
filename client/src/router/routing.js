import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navigation from "../components/navigation.component";
import { AuthContext } from "../helpers/AuthContext";

import EventBus from "../common/EventBus";
import Home from "../pages/home.page";
import Login from "../pages/login.page";
import MovieDetails from "../pages/movieDetails.page";
import Movies from "../pages/movies.page";
import Profile from "../pages/profile.page";
import Register from "../pages/register.page";

import { getCurrentUser, logout } from "../services/auth.service";
import { ToastContainer } from "react-toastify";
import Watchlist from "../pages/watchlist.page";

const Routing = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = getCurrentUser();

  useEffect(() => {
    user && setCurrentUser(user);

    EventBus.on("logout", () => {
      handleLogout();
    });

    return () => EventBus.remove("logout");
  }, []);

  const handleLogout = () => {
    setCurrentUser(undefined);
    logout();
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <ToastContainer />
        <Navigation handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/explore" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
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
