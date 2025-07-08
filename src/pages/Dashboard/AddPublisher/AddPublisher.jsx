import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaBuilding } from "react-icons/fa";

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = data.logo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const imgRes = await axios.post(imgbbAPI, formData);
      const imageUrl = imgRes.data.data.url;

      const publisherData = {
        name: data.name,
        logo: imageUrl,
      };

      await axiosSecure.post("/publishers", publisherData);
      toast.success("Publisher added successfully!");
      reset();
    } catch (err) {
      toast.error("Failed to add publisher");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-cyan-100 mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-700 flex justify-center items-center gap-2">
          <FaBuilding /> Add New Publisher
        </h2>
        <p className="text-gray-500 text-sm mt-1">Enter publisher name and logo</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Publisher Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publisher Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="e.g. The Times"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publisher Logo</label>
          <input
            {...register("logo", { required: true })}
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
