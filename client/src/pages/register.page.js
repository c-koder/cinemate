import { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { signup } from "../services/auth.service";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .min(6, "Username must be at least 6 chars.")
    .max(20, "Username musn't exceed 20 chars."),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 chars.")
    .max(40, "Password musn't exceed 40 chars."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match."),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
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

  const handleRegister = () => {
    setMessage("");
    setSuccessful(false);
    setLoading(true);
    signup(username, email, password).then(
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
          <h3 className="title">Register</h3>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="form-horizontal"
          >
            <div className="form-group">
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
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                {...register("confirmPassword")}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm Password"
                disabled={password === ""}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
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
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
