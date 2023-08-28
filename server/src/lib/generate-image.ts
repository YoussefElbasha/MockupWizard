import axios, { AxiosRequestHeaders } from "axios";

// Function to generate an image based on a prompt
async function generateImage(prompt: string) {
  // Retrieve API key and URL from environment variables
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const apiUrl = process.env.OPENAI_API_URL!;

  // Define the API version
  const apiVersion = "2023-06-01-preview";

  // Construct the API endpoint URL for image generation
  const url = `${apiUrl}openai/images/generations:submit?api-version=${apiVersion}`;

  // Set up request headers
  const headers: AxiosRequestHeaders = {
    "Api-Key": openaiApiKey ?? "",
    "Content-Type": "application/json",
  };

  // Define payload for image generation
  const payload = {
    prompt: prompt,
    //256×256, 512×512, or 1024×1024.
    size: "1024x1024",
    n: 1,
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
    console.log("Image URLs:", imageUrls);
    return imageUrls;
  } catch (error) {
    console.error("Error:", error);
  }
}

export { generateImage };
