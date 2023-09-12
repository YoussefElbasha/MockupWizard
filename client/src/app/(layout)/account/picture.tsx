import axios from "axios";
import api from "../../../../util/Axios";
import toast from "react-hot-toast";
import Image from "next/image";

const ProfilePicture = ({ data, mutate }: any) => {
  const handleProfilePictureChange = async (e: any) => {
    const prevData = { ...data };
    try {
      const image = e.target.files[0];

      if (!image) return;

      mutate({ ...data, picture: URL.createObjectURL(image) }, false);

      const formData = new FormData();

      formData.append("file", image);
      formData.append("upload_preset", "model_designs");

      const {
        data: { secure_url: url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dfbid2goy/image/upload",
        formData
      );

      await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/edit-profile`,
        {
          picture: url,
        }
      );

      mutate(
        { ...data, picture: url },
        {
          revalidate: true,
        }
      );
      mutate("user-info");
    } catch (error: any) {
      toast.error("Failed to upload profile picture");
      mutate(prevData, false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="profile" className="text-sm text-white/60">
        Profile Picture
      </label>
      <div className="relative w-40 h-40 overflow-hidden bg-gray-900 border rounded-full cursor-pointer border-white/10">
        <input
          className="absolute inset-0 z-10 opacity-0 cursor-pointer"
          type="file"
          id="profile"
          accept="image/*"
          title=""
          onChange={handleProfilePictureChange}
        />
        <Image
          src={data?.picture ?? "/pepeWizard.png"}
          fill
          alt="Profile Picture"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
