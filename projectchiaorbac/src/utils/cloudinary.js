// This file contains the utility function to upload a file to Cloudinary.
import dotenv from 'dotenv';
dotenv.config()
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration (Make sure this is set correctly)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No file path provided");
      return null;
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detects file type (image, video, etc.)
    });

    // Log successful upload
    console.log("File uploaded to Cloudinary:", response.url);

    // Delete the local file after successful upload
    try {
      await fs.promises.unlink(localFilePath); // Asynchronous unlink
      console.log("Local file deleted after upload:", localFilePath);
    } catch (deleteError) {
      console.error("Failed to delete local file after upload:", deleteError);
    }

    return response; // Return the Cloudinary response

  } catch (error) {
    console.error("Error during Cloudinary upload:", error);

    // Try deleting the file even after upload failure
    try {
      await fs.promises.unlink(localFilePath); // Asynchronous unlink
      console.log("Local file deleted after failed upload:", localFilePath);
    } catch (deleteError) {
      console.error("Failed to delete local file after upload failure:", deleteError);
    }

    return null; // Return null in case of failure
  }
};

export { uploadOnCloudinary };

