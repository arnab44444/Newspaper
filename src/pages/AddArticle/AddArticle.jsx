import React, { use } from "react";
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
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
  const [publishers, setPublishers] = React.useState([]);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  React.useEffect(() => {
    axiosSecure.get("/publishers")
      .then(res => setPublishers(res.data))
      .catch(err => console.error("Publisher fetch failed", err));
  }, [axiosSecure]);

  const onSubmit = async (data) => {
    const imageFile = data.image[0];

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
        status: "pending",
        isPremium: false,
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
      } else {
        toast.error("❌ Failed to submit article.");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-cyan-200">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-cyan-700 tracking-wide">
        Add New Article
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Article Title"
            className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition
              ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <input
            {...register("image", { required: "Image is required" })}
            type="file"
            accept="image/*"
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition
              ${errors.image ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.image && <p className="text-red-500 mt-1 text-sm">{errors.image.message}</p>}
        </div>

        <div>
          <select
            {...register("publisher", { required: "Please select a publisher" })}
            className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition
              ${errors.publisher ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select Publisher</option>
            {publishers.map(pub => (
              <option key={pub._id} value={pub.name}>
                {pub.name}
              </option>
            ))}
          </select>
          {errors.publisher && <p className="text-red-500 mt-1 text-sm">{errors.publisher.message}</p>}
        </div>

        <div>
          <Controller
            name="tags"
            control={control}
            rules={{ required: "Please select at least one tag" }}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                isMulti
                placeholder="Select Tags"
                classNamePrefix="react-select"
                className={`text-black
                  ${errors.tags ? "border-red-500" : ""}
                `}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: errors.tags ? "#f87171" : provided.borderColor,
                    boxShadow: state.isFocused ? "0 0 0 2px #22d3ee" : provided.boxShadow,
                    "&:hover": {
                      borderColor: "#22d3ee",
                    },
                    minHeight: "48px",
                  }),
                }}
              />
            )}
          />
          {errors.tags && <p className="text-red-500 mt-1 text-sm">{errors.tags.message}</p>}
        </div>

        <div>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
            rows={6}
            className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition
              ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
