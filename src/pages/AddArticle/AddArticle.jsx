import React, { use,  useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const tagOptions = [
  { value: "Future", label: "Future" },
  { value: "Space", label: "Space" },
  { value: "Social Media", label: "Social Media" },
  { value: "Virtual Reality", label: "Virtual Reality" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Politics", label: "Politics" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Business", label: "Business" },
  { value: "Science", label: "Science" },
  { value: "Environment", label: "Environment" },
  { value: "Travel", label: "Travel" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "World", label: "World" },
  { value: "Crime", label: "Crime" },
  { value: "Fashion", label: "Fashion" },
  { value: "Food", label: "Food" },
  { value: "Finance", label: "Finance" },
  { value: "Opinion", label: "Opinion" },
  { value: "Culture", label: "Culture" },
  { value: "Breaking News", label: "Breaking News" },
  { value: "Art", label: "Art" },
  { value: "History", label: "History" },
  { value: "Automotive", label: "Automotive" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Gaming", label: "Gaming" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Weather", label: "Weather" },
  { value: "Opinion", label: "Opinion" },
  
];


const AddArticle = () => {
  const { user } = use(AuthContext);
  const { register, handleSubmit, control, reset } = useForm();
  const [publishers, setPublishers] = useState([]);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  // Fetch all publishers (added by admin)
  useEffect(() => {
    axiosSecure.get("/publishers")
      .then(res => setPublishers(res.data))
      .catch(err => console.error("Publisher fetch failed", err));
  }, [axiosSecure]);

  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    // Upload to imgbb
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const imgRes = await axios.post(imgbbURL, formData);
      const imageUrl = imgRes.data.data.url;

      const articleData = {
        title: data.title,
        image: imageUrl,
        publisher: data.publisher,
        tags: data.tags.map(tag => tag.value),
        description: data.description,
        authorName: user.displayName,
        authorEmail: user.email,
        authorPhoto: user.photoURL,
        status: "pending", // default
        isPremium: false, // default
        views: 0,
        postedDate: new Date(),
      };

      await axiosSecure.post("/articles", articleData);
      toast.success("Article submitted for review!");
      reset();
      navigate("/my-articles");

    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("⚠️ Normal users can only post 1 article. Upgrade to premium.");
        //navigate("/subscription");
      } else {
        toast.error("❌ Failed to submit article.");
      }
      console.error(err);
    }
  
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-cyan-700">Add New Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("title", { required: true })}
          placeholder="Article Title"
          className="w-full p-3 border rounded"
        />

        <input
          {...register("image", { required: true })}
          type="file"
          accept="image/*"
          className="w-full p-3 border rounded"
        />

        <select {...register("publisher", { required: true })} className="w-full p-3 border rounded">
          <option value="">Select Publisher</option>
          {publishers.map(pub => (
            <option key={pub._id} value={pub.name}>{pub.name}</option>
          ))}
        </select>

        <Controller
          name="tags"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={tagOptions}
              isMulti
              placeholder="Select Tags"
              className="text-black"
            />
          )}
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full p-3 border rounded"
          rows={5}
        />

        <button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-900 text-white py-2 rounded">
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
