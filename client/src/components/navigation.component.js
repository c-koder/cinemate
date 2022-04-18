import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";
import { logout } from "../services/auth.service";
import ContextDropdown from "./contextDropdown.component";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const values = [
    { id: 0, name: "Profile" },
    { id: 1, name: "Privacy" },
    { id: 2, name: "Settings" },
    { id: 3, name: currentUser ? "Logout" : "Login" },
  ];
  const [value, setValue] = useState(undefined);

  const handleLogout = () => {
    setCurrentUser(undefined);
    logout();
  };

  useEffect(() => {
    if (value && value.id === 3) {
      handleLogout();
    }
  }, [value]);

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark justify-content-center fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex me-auto">
          Cinemate
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse w-100" id="navbar">
          <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/explore" className="nav-link">
                Explore
              </Link>
            </li>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/saved" className="nav-link">
                    Watchlist
                  </Link>
                </li>
                <li className="nav-item dropdown context-dropdown">
                  <a
                    style={{ cursor: "pointer" }}
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {currentUser.username}
                  </a>
                  <ContextDropdown values={values} setValue={setValue} />
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
