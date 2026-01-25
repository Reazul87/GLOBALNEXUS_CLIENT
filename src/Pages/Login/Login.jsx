import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading";

const Login = () => {
  const { signInUser, setLoading, loading, signInWithGoogle } =
    useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterUser = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const oneLowerCase = /(?=.*[a-z]).*/;
    const oneUpperCase = /(?=.*[A-Z]).*/;
    const sixNumber = /^.{6,}$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!password.length) {
      return toast.error("Password must not be empty");
    }
    if (!oneLowerCase.test(password)) {
      return toast.error("Password must contain at least 1 lowercase letter");
    }
    if (!oneUpperCase.test(password)) {
      return toast.error("Password must contain at least 1 uppercase letter");
    }
    if (!sixNumber.test(password)) {
      return toast.error("Password must be at least 6 characters long");
    }

    setLoading(true);
    signInUser(email, password)
      .then((result) => {
        navigate(location.state ? location.state : "/");
        setLoading(false);
        // setUser(result.user);
        // console.log(result.user);
        toast.success("Login Successful");
      })
      .catch((e) => {
        const message =
          e.code === "auth/wrong-password" ? "Wrong password" : "Login failed";
        toast.error(message);
      })
      .finally(() => setLoading(false));
  };

  const handleDemoUser = () => {
    const email = `${import.meta.env.VITE_USER_EMAIL}`;
    const password = `${import.meta.env.VITE_USER_PASSWORD}`;
    setLoading(true);
    signInUser(email, password)
      .then((result) => {
        navigate(location.state ? location.state : "/");
        setLoading(false);
        toast.success("Login Successful");
      })
      .catch((e) => {
        const message =
          e.code === "auth/wrong-password" ? "Wrong password" : "Login failed";
        toast.error(message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        toast.success("Google Login Success");
        navigate(location.state ? location.state : "/");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Google login failed");
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loading></Loading>
    // return (
    //   <div className="flex justify-center items-center h-screen">
    //     <span className="loading loading-spinner loading-lg"></span>
    //   </div>
    // );
  }

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-xl my-10 border border-gray-100">
      <title>Login</title>
      <div className="card-body">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#173A75]">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to continue your journey. Manage your account, explore new
            features, and more.
          </p>
        </div>
        <form onSubmit={handleRegisterUser}>
          <fieldset className="fieldset">
            <label className="label font-bold text-black/70">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-blue-200"
              placeholder="Email Address"
            />

            <label className="label font-bold text-black/70">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input rounded-full focus:border-0 focus:outline-blue-200"
                placeholder="Password"
              />
              <button
                className="absolute top-2.5 right-7 text-gray-500 cursor-pointer z-10"
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <EyeClosed size={20}></EyeClosed>
                ) : (
                  <Eye size={20}></Eye>
                )}
              </button>
            </div>

            <Link className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline transition duration-150">
              Forgot Password?
            </Link>
            <button
              className={`btn mt-4 text-white rounded-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] hover:from-[#FF6F00] hover:to-[#FF974D]`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleDemoUser}
              className={`btn mt-0 text-white rounded-full bg-gradient-to-r from-[#ad55d6] to-[#9a38db] hover:from-[#8f25f1] hover:to-[#bd5ef5]`}
            >
              Demo Login
            </button>
          </fieldset>
        </form>
        <div className="flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5]"
        >
          <FaGoogle />
          Login with Google
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to={"/register"}
            className="font-medium text-blue-600 hover:text-blue-500 ml-1 transition duration-150"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
