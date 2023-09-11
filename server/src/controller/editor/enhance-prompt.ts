import axios from "axios";
const enhahcePrompt = async (req: any, res: any) => {
  try {
    const prompt = req.body.prompt;
    await axios
      .post("https://microsoft-promptist.hf.space/run/predict", {
        data: [prompt],
      })
      .then((result) => {
        console.log(result.data.data[0]);
        res.send(result.data.data[0]);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default enhahcePrompt;
