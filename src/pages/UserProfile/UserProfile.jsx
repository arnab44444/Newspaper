import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Clean up
    }
  }, [imageFile]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let finalPhotoURL = photoURL;

    if (imageFile) {
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        const response = await axios.post(uploadURL, formData);

        finalPhotoURL = response.data.data.url;
      } catch (error) {
        toast.error("Image upload failed!");
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: finalPhotoURL,
      });
      setPhotoURL(finalPhotoURL);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-base-200 rounded-lg shadow p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Update Your Profile</h2>

      {/* ✅ Image Preview */}
      <div className="mb-6 text-center">
        <img
          src={preview || "https://via.placeholder.com/150"}
          alt="Profile Preview"
          className="w-32 h-32 rounded-full mx-auto object-cover border shadow"
        />
        <p className="text-sm text-gray-500 mt-1">Current Profile Picture</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Upload New Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Photo URL (Optional)</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn bg-green-600 w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
