import React from "react";
import Google from "@/app/icons/google.svg";
import Facebook from "@/app/icons/facebook.svg";

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
          type="button"
          className="px-8 py-2 bg-white rounded-xl text-black"
        >
          <Facebook />
        </button>
        <button
          type="button"
          className="px-8 py-2 bg-white rounded-xl text-black"
        >
          <Google />
        </button>
      </div>
    </div>
  );
};

export default OauthComponent;
