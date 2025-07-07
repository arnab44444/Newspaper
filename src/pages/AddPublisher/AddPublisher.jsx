import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600 text-center">Add Publisher</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Publisher Name"
          className="w-full border rounded p-3"
        />
        
        <input
          {...register("logo", { required: true })}
          type="file"
          accept="image/*"
          className="w-full border rounded p-3"
        />
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
