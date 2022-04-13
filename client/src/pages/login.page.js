import { useContext, useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";
import { AuthContext } from "../helpers/AuthContext";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
});

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const viewAnim = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleLogin = () => {
    setMessage("");
    setLoading(true);
    login(username, password).then(
      (response) => {
        setLoading(false);
        setCurrentUser(response)
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
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={viewAnim}
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <div className="row justify-content-center">
        <div className="form-container p-4">
          <h3 className="title">Login</h3>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="form-horizontal"
          >
            <div className="form-group col-md-auto">
              <label>User Name</label>
              <input
                type="text"
                name="username"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>

            <div className="form-group col-md-auto">
              <label>Password</label>
              <input
                type="password"
                name="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
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
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
