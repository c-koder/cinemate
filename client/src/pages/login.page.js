import { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = ({ setLogged }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(null);
  const [checkBtn, setCheckBtn] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      login(username, password).then(
        (response) => {
          setLogged(response.accesstoken !== null)
          navigate("/profile");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
          setPassword("");
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center">
        <div className="form-container p-4">
          <h3 className="title">Login</h3>
          <Form
            onSubmit={handleLogin}
            className="form-horizontal"
            ref={(c) => {
              setForm(c);
            }}
          >
            <div className="form-group col-md-auto">
              <label>User Name</label>
              <Input
                type="text"
                className="form-control"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group col-md-auto">
              <label>Password</label>
              <Input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                validations={[required]}
              />
            </div>

            <span className="hstack my-3">
              <span className="signin-link">
                A new user? Click here to <Link to={"/register"}>Register</Link>
              </span>
              <div className="form-group  ms-auto">
                <button
                  className="btn btn-primary primary-btn"
                  disabled={loading}
                >
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm mx-2"
                      style={{ color: "var(--light)" }}
                    ></span>
                  )}
                  Login
                </button>
              </div>
            </span>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                setCheckBtn(c);
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
