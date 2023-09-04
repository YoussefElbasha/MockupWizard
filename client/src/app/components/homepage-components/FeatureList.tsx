import React from "react";
import FeatureItem from "./FeautureItem";

const features = [
  {
    title: "Effortlessly Visualize Your Designs",
    paragraph:
      "Transform your design ideas into captivating visuals with Mockup Wizard. Our intuitive platform allows you to bring your designs to life on t-shirts and mugs, helping you visualize how they will look in the real world.",
  },
  {
    title: "AI-Powered Design Generation",
    paragraph:
      "Experience the power of AI with Mockup Wizard's cutting-edge design assistance feature. Let the AI algorithm fuel your creativity, offering fresh perspectives and inspiring ideas that will take your designs to the next level.",
  },
  {
    title: "Manage and Categorize Your Designs",
    paragraph:
      "Keep your design projects organized and easily accessible with Mockup Wizard's folder organization feature. Say goodbye to scattered files and endless searches. Our intuitive platform allows you to streamline your design workflow by creating folders for different clients, campaigns, or personal projects. Stay on top of your work and efficiently manage multiple designs with ease.",
  },
  {
    title: "Endless Possibilities for Customization",
    paragraph:
      "Our platform offers a wide range of customization options, giving you the freedom to create truly unique products. Choose from a diverse selection of mugs and t-shirts, with options for different colors, sizes, and materials. Whether you're designing for yourself, your brand, or for gifting purposes, our customization options ensure that your creations stand out from the crowd.",
  },
];

const FeatureList = () => {
  return (
    <div>
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          imgUrl="your-image-url.jpg" // Add your image URL here
          title={feature.title}
          paragraph={feature.paragraph}
          reverse={index % 2 === 1} // Reverse every other item for variation
        />
      ))}
    </div>
  );
};

export default FeatureList;
