"use client";
import Image from "next/image";
import AuthCanvas from "./components/auth-components/AuthCanvas";

export default function Home() {
  return (
    <div>
      <div className="bg-[#14162E] h-screen flex m-auto relative">

      <div className='absolute top-1/4 left-[6%] transform -translate-y-1/4'>
        <div className='w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-50' />
      </div>
      <div className='absolute top-1/2 left-1/4 transform translate-y-1/4 -translate-x-3/4'>
        <div className='w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50' />
      </div>

        <div className="m-auto items-center z-10">
          <div className="flex items-center h-screen">
            <AuthCanvas />
            <div className="p-10 text-white flex-grow justify-center flex flex-col items-start gap-10">
              <div>
                <h1 className="text-4xl font-bold">
                  Unleash your products potential!
                </h1>
              </div>
              <div className="font-semibold">
                <p>
                  have a design you want to add? you can{" "}
                  <span className="text-blue-700">
                    <a href="/signup">Start Now!</a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
