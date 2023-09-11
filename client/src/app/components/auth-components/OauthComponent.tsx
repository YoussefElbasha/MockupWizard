import React from "react";
import Google from "@/app/icons/google.svg";
import Facebook from "@/app/icons/facebook.svg";

const handleGoogleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

const OauthComponent = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <hr className="w-16" />
        <p className="text-xs font-normal">Or continue with</p>
        <hr className="w-16" />
      </div>
      <div className="flex gap-10 justify-center my-8">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="transition duration-300 ease-in-out px-8 py-2 border-none rounded-3xl shadow-btn text-gray-700 text-base font-medium bg-white bg-no-repeat bg-left-center bg-12px-11px hover:shadow-btn-active active:bg-gray-200 focus:outline-none focus:shadow-outline" // Add w-full class for full width
        >
          <div className="flex items-center">
            <Google className="w-6 h-6 mr-2" /> {/* Adjust the icon size */}
            <span className="flex-grow">Continue with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OauthComponent;
