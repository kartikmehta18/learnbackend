import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// (async function () {
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadOnCloudinary = async (localFilesPath) => {
  try {
    if (!localFilesPath) return null;
    const response = await cloudinary.uploader.upload(localFilesPath, {
      resource_type: "auto",
    });
    console.log("Image uploaded successfully", response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilesPath); // remove the locally saved temporary file as the upload failed
    return null;
    console.log(error);
  }
};
console.log(uploadOnCloudinary);
export { uploadOnCloudinary };
// Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url("shoes", {
//   fetch_format: "auto",
//   quality: "auto",
// });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();
