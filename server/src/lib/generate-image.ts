import axios, { AxiosRequestHeaders } from "axios";

// Function to generate an image based on a prompt
async function generateImage(prompt: string) {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const apiUrl = process.env.OPENAI_API_URL!;

  const apiVersion = "2023-06-01-preview";

  const url = `${apiUrl}openai/images/generations:submit?api-version=${apiVersion}`;

  const headers: AxiosRequestHeaders = {
    "Api-Key": openaiApiKey ?? "",
    "Content-Type": "application/json",
  };

  // Define payload for image generation
  const payload = {
    prompt: prompt,
    //256×256, 512×512, or 1024×1024.
    size: "512x512",
    n: 2,
  };

  try {
    // Submit image generation request
    const submission = await axios.post(url, payload, { headers });
    const operationLocation = submission.headers["operation-location"];

    let status = "";
    let response;

    // Poll for completion status
    while (status !== "succeeded") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      response = await axios.get(operationLocation, { headers });
      status = response.data.status;
    }

    // Retrieve and log image URLs
    const imageUrls = response?.data.result.data.map((image: any) => image.url);
    return imageUrls;
  } catch (error) {
    console.error("Error:", error);
  }
}

export { generateImage };
