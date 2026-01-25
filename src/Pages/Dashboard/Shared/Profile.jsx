import React from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import photoUpload from "../../../assets/image-upload-icon.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading";

const Profile = () => {
  const { user, loading, updateUserProfile } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading></Loading>;
  }

  const handleUpdateProfile = async (data) => {
    const { name, photo } = data;
    const img = photo[0];

    try {
      if (user) {
        let photoURL = user?.photoURL;

        if (img) {
          const imgData = new FormData();
          imgData.append("image", img);

          const pictureG = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMG_BB_KEY
            }`,
            imgData,
          );
          photoURL = pictureG.data?.data?.display_url;
        }

        if (name || photoURL) {
          updateUserProfile(name, photoURL).then(() => {
            toast.success(`Profile Updated`);
          });
        }
      }
    } catch (e) {
      toast.error("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex mb-5 items-center justify-between">
              <h2 className="card-title md:text-3xl text-2xl">My Profile</h2>
            </div>
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center mb-6">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="w-24 h-24 object-cover rounded-full ring ring-sky-500 ring-offset-base-100 ring-offset-2"
              />
              <div>
                <p className="text-md md:text-lg">{user?.email}</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="space-y-4"
            >
              {/* Photo Upload */}
              <div className="space-y-1.5">
                <label className="label font-bold text-black/70">
                  Photo Upload
                </label>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <img src={photoUpload} alt="upload photo" className="h-10" />

                  <input
                    accept="image/*"
                    {...register("photo")}
                    type="file"
                    className="cursor-pointer text-gray-500 hover:text-pink-500 font-medium w-full"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="label font-bold text-black/70">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  defaultValue={user?.displayName}
                  className="input rounded-full focus:border-0 focus:outline-pink-300 w-full"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-400">{errors.name.message}</p>
                )}
              </div>

              <button type="submit" className="btn btn-error w-full">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
