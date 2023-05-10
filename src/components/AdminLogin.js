import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmitButton = () => {
    if (values.email && values.password) {
      setErrorMsg("");
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((response) => {
          const user = response.user;
          if (user) {
            navigate("/");
          }
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
    } else {
      setErrorMsg("Please fill all the required fields!");
    }
  };

  return (
    <>
      <div className="d-flex h-100">
        <div className="card container col-10 col-sm-10 col-md-9 col-lg-8 mt-5 p-0 align-self-center border-primary">
          <div className="card-header border-darks">
            <div className="mt-2 text-center">
              <h3>MediCare</h3>
              <h4>Welcome Back!</h4>
            </div>
          </div>
          <div className="card-body">
            <div className="container align-self-center">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="email"
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, email: event.target.value }));
                  }}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, password: event.target.value }));
                  }}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="text-center text-danger">{errorMsg}</div>
              <div className="form-group mt-4">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleSubmitButton}>
                  Login
                </button>
              </div>
              <div className="form-group text-center">
                Don't have an account? <Link to="/register">Register here!</Link> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
