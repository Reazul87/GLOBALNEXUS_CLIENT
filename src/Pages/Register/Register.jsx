import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading";

const Register = () => {
  const {
    createUser,
    setUser,
    setLoading,
    signOutUser,
    loading,
    signInWithGoogle,
  } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterUser = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const letterSpace = /^[A-Za-z\s]+$/;
    const min3Chars = /^.{3,}$/;
    const oneLowerCase = /(?=.*[a-z]).*/;
    const oneUpperCase = /(?=.*[A-Z]).*/;
    const sixNumber = /^.{6,}$/;

    if (!name.length) {
      return toast.error("Name must not be empty");
    }
    if (!min3Chars.test(name.trim())) {
      return toast.error("Name must be at least 3 characters");
    }
    if (!letterSpace.test(name)) {
      return toast.error("Name can only contain letters and spaces");
    }
    if (!emailRegex.test(email)) return toast.error("Invalid email");
    if (!password) return toast.error("Password required");

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
    createUser(email, password)
      .then((data) => {
        // console.log(data.user);
        signOutUser().then(() => {
          setLoading(false);
          setUser(null);
          navigate("/login");
        });
        toast.success("Account created successfully!");
      })
      .catch((e) => {
        const message =
          e.code === "auth/email-already-in-use"
            ? "Email already registered"
            : "Registration failed";
        toast.error(message);
        console.error("Registration failed:", e);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        toast.success("Google Registration Success");
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
      <title>Registration</title>
      <div className="card-body">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#173A75]">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Join the Global Nexus community</p>
        </div>
        <form onSubmit={handleRegisterUser}>
          <fieldset className="fieldset">
            <label className="label font-bold text-black/70">Full Name</label>
            <input
              type="text"
              name="displayName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Full Name"
            />

            <label className="label font-bold text-black/70">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Photo URL"
            />
            <label className="label font-bold text-black/70">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="email@domain.com"
            />

            <label className="label font-bold text-black/70">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input rounded-full focus:border-0 focus:outline-pink-200"
                placeholder="••••••••"
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
            <button
              className={`btn mt-4 text-white rounded-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] hover:from-[#FF6F00] hover:to-[#FF974D]`}
            >
              Register
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
        <p className="text-center">
          Already have an account? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
