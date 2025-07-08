import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    // Password validation check
    const password = data.password;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasUppercase || !hasSpecialChar || !hasNumber) {
      toast.error("Password must include an uppercase letter, special character, and number.");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      const userInfo = {
        email: data.email,
        name: data.name,
        photoURL: profilePic,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      toast.success("Registration successful!");
      navigate(from);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imgUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-100 flex items-center justify-center p-4">
      <div className="card bg-white w-full max-w-md shadow-2xl border border-cyan-300">
        <div className="card-body px-6 py-8">
          <h2 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-semibold">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="label font-semibold">Profile Picture</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="Enter password"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Must be at least 6 characters
                </p>
              )}
              <ul className="text-xs text-gray-600 mt-2 list-disc ml-4">
                <li>Must include at least 1 capital letter</li>
                <li>Must include at least 1 special character</li>
                <li>Must include at least 1 number</li>
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg"
            >
              Register
            </button>
          </form>

          {/* Already registered */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-cyan-600 hover:underline font-medium">
              Login
            </Link>
          </p>

          <div className="divider mt-6 mb-2">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
