import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch article to prefill form
  const { data: article, isPending } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  // ✅ Reset form with fetched data
  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        publisher: article.publisher,
      });
    }
  }, [article, reset]);

  const onSubmit = async (data) => {
    try {
      const updateDoc = {
        title: data.title,
        description: data.description,
        publisher: data.publisher,
        status: "pending", // force re-review
      };

      const res = await axiosSecure.patch(`/articles/${id}`, updateDoc);

      if (res.data.modified > 0) {
        toast.success("Article updated successfully");
        navigate("/my-articles");
      } else {
        toast.info("No changes detected");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  if (isPending) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-cyan-600">Update Article</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Article Title"
          className="w-full border p-3 rounded"
        />

        <input
          {...register("publisher", { required: true })}
          placeholder="Publisher Name"
          className="w-full border p-3 rounded"
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          rows={6}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
        >
          Update Article
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
