import axios from "axios";
import { Save } from "react-ionicons";
import useSWRMutation from "swr/mutation";
import { useCanvasContext } from "../contexts/canvas-context";

const SaveButton = () => {
  const { color, canvasObjects, modelType } = useCanvasContext();

  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/editor/clm96ruta0001v0zcwdt0rd8x`,
    (url) => {
      axios.post(url, { color, canvasObjects, modelType });
    }
  );

  return (
    <div>
      <button
        className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
        onClick={() => trigger()}
      >
        <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300">
          <Save style={{ fill: "black", height: "2em", width: "2em" }} />
        </div>
      </button>
    </div>
  );
};
export default SaveButton;
