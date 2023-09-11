import FeatureList from "../components/homepage-components/FeatureList";
import Link from "next/link";
import StarIcon from "../icons/stars.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full w-screen h-full gap-4 overflow-x-hidden">
      <div className="h-[calc(90vh-10rem)] inline-flex p-[32rem 13.5rem 16rem 13.5rem] justify-center items-center flex-col gap-6">
        <div>
          <h1 className="relative mt-1 text-5xl font-semibold tracking-tight text-center text-white font-inter leading-12 whitespace-nowrap">
            Unleash your product&apos;s potential!
          </h1>
        </div>
        <div className="homepage p-text-black">
          <p className="relative flex items-start justify-center p-0 px-58 py-18">
            Have a design you want to see materialized? You can see them here
          </p>
        </div>
        <Link href="/sign-in">
          <button className="flex items-center px-8 py-2 rounded-full bg-custom-gradient">
            <div className="text-white">Get Started</div>
          </button>
        </Link>
      </div>

      <div className="relative w-[125%] h-[40vh] overflow-hidden">
        <div className="absolute w-full h-[60rem] bg-background rounded-full flex-shrink-0 z-10 top-[75%] border-t border-secondary/10"></div>
        <div className="absolute w-[65rem] h-[30rem] left-1/2 -translate-x-1/2 top-[18%]">
          <StarIcon className="w-full h-full" />
        </div>
        <div className="absolute w-[58%] aspect-[2/1] bg-custom-radial-gradient top-[22%] left-1/2 -translate-x-1/2"></div>
      </div>
      <FeatureList />
      <div className="relative w-[125%] h-[80vh] overflow-hidden">
        <div className="absolute w-full h-[60rem] bg-background rounded-full flex-shrink-0 z-10 bottom-[45%] border-b border-primary/10"></div>
        <div className="absolute w-[65rem] h-[30rem] left-1/2 -translate-x-1/2 bottom-[19%]">
          <StarIcon className="w-full h-full" />
        </div>
        <div className="absolute w-[58%] aspect-[2/1] bg-custom-radial-gradient2 left-1/2 -translate-x-1/2 bottom-[17%] "></div>
      </div>
    </div>
  );
}
