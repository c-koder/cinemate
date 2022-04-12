import { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
import { register } from "../services/auth.service";
import { Link } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validateEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Valid email required.
      </div>
    );
  }
};

const validateUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Username must be 3 to 20 chars.
      </div>
    );
  }
};

const validatePassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Password must be 6-40 chars.
      </div>
    );
  }
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(null);
  const [checkBtn, setCheckBtn] = useState(null);

  const validateConfirmPassword = (value) => {
    if (password !== confirmPassword) {
      return (
        <div className="alert alert-danger" role="alert">
          Passwords don't match.
        </div>
      );
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setLoading(true);
    form.validateAll();
    if (checkBtn.context._errors.length === 0) {
      register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setLoading(false);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
          setLoading(false);
        }
      );
    }
  };

  return (
    // <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
    //   <div className="card card-container">
    //     <Form
    //       onSubmit={handleRegister}
    //       ref={(c) => {
    //         setForm(c);
    //       }}
    //     >
    //       <div>
    //         <h2 className="text-center">Register</h2>
    //         <div className="form-group">
    //           <label htmlFor="name">Name</label>
    //           <Input
    //             type="text"
    //             className="form-control shadow-none"
    //             name="name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //             validations={[required, validateName]}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="username">Username</label>
    //           <Input
    //             type="text"
    //             className="form-control shadow-none"
    //             name="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             validations={[required, validateUsername]}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="email">Email</label>
    //           <Input
    //             type="text"
    //             className="form-control shadow-none"
    //             name="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             validations={[required, validateEmail]}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="password">Password</label>
    //           <Input
    //             type="password"
    //             className="form-control shadow-none"
    //             name="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             validations={[required, validatePassword]}
    //           />
    //         </div>
    //         <br />
    //         <div className="text-center form-group">
    //           <button className="btn btn-primary btn-block shadow-none">
    //             Register
    //           </button>
    //         </div>
    //       </div>
    //       <br />
    //       {message && (
    //         <div className="form-group">
    //           <div
    //             className={
    //               successful ? "alert alert-success" : "alert alert-danger"
    //             }
    //             role="alert"
    //           >
    //             {message}
    //           </div>
    //         </div>
    //       )}
    //       <CheckButton
    //         style={{ display: "none" }}
    //         ref={(c) => {
    //           setCheckBtn(c);
    //         }}
    //       />
    //     </Form>
    //   </div>
    // </div>
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center">
        <div className="form-container p-4">
          <h3 className="title">Register</h3>
          <Form
            onSubmit={handleRegister}
            className="form-horizontal"
            ref={(c) => {
              setForm(c);
            }}
          >
            <div className="row my-3 justify-content-center">
              <div className="form-group col-md-auto">
                <label>User Name</label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, validateUsername]}
                />
              </div>
              <div className="form-group col-md-auto">
                <label>Email</label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validateEmail]}
                />
              </div>
            </div>
            <div className="row my-3 justify-content-center">
              <div className="form-group col-md-auto">
                <label>Password</label>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, validatePassword]}
                />
              </div>
              <div className="form-group col-md-auto">
                <label>Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  disabled={password === ""}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  validations={[required, validateConfirmPassword]}
                />
              </div>
            </div>
            <span className="hstack my-3">
              <span className="signin-link">
                Already have an account? Click here to{" "}
                <Link to={"/login"}>Login</Link>
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
                  Create Account
                </button>
              </div>
            </span>
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
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

export default Register;
