import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.error(errorCode);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-100 flex items-center justify-center p-4">
      <div className="card bg-white w-full max-w-md shadow-2xl border border-cyan-300">
        <div className="card-body px-6 py-8">
          <h2 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label font-semibold text-gray-600">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-cyan-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-semibold text-gray-600">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="Enter your password"
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-cyan-400"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a className="text-sm text-cyan-600 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button className="btn w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg">
              Login
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </form>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            New to this site?{" "}
            <Link
              to="/auth/register"
              state={{ from }}
              className="text-cyan-600 hover:underline font-medium"
            >
              Register Here
            </Link>
          </p>

          {/* Social Login */}
          <div className="divider mt-6 mb-2">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
