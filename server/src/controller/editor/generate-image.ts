import { generateImage } from "../../lib/generate-image";

const generateImageController = async (req: any, res: any) => {
  try {
    const prompt = req.body.prompt;
    const imageUrl = await generateImage(prompt);
    res.json(imageUrl);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default generateImageController;
