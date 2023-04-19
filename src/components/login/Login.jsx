import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import app from '../../firebase/firebase.confige';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const logIn = result.user;
        console.log(logIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelLoginGoogle = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handelLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <div className="flex border-2 items-center gap-10 mt-5">
                  <img className="w-10"
                    src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Facebook-512.png"
                    alt=""
                  />
                  <span className="font-bold">Login with Facebook</span>
                </div>
                <div onClick={handelLoginGoogle} className="flex border-2 items-center gap-10 mt-5">
                  <img className="w-10"
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-02-512.png"
                    alt=""
                  />
                  <span className="font-bold">Login with Google</span>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <Link to="/register">
              New to here?
              <span className="font-semibold text-green-600">
                please register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
