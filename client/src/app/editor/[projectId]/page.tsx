"use client";

import Editor from "../components/Editor";
import EditorTabs from "../editor tabs/EditorTabs";
import TestCanvas from "../components/testCanvas";
import { CanvasContextProvider } from "../contexts/canvas-context";
import { useRef } from "react";

interface pageProps {
  params: {
    projectId: string;
  };
}

const Home = ({ params }: pageProps) => {
  const screenShotRef = useRef<HTMLCanvasElement>(null);

  return (
    <CanvasContextProvider projectId={params.projectId}>
      <div className="h-screen w-full relative bg-gray-500 overflow-hidden">
        <Editor ref={screenShotRef} />
        <EditorTabs ref={screenShotRef} projectId={params.projectId} />
        <TestCanvas />
      </div>
    </CanvasContextProvider>
  );
};

export default Home;
