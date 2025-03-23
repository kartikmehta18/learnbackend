// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const registerUser = asyncHandler(async (req, res) => {
//   //   res.status(200).json({
//   //     message: "ok chai or code",
//   //   });
//   const { fullname, email, username, password } = req.body;
//   console.log(email);

//   // if(fullname ===""){
//   //     throw ApiError.badRequest("Fullname is required");
//   // } orr

//   if (
//     [fullname, email, username, password].some((field) => field?.trim() === "")
//   ) {
//     throw ApiError.badRequest("all field  is required");
//   }

//   const existingUser=  await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (existingUser) {
//     throw ApiError.badRequest("User already exists");
//   }

//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   const coverImageLocalPath = req.files?.coverImage[0]?.path;
//   if (!avatarLocalPath) {
//     throw ApiError(4400, "Avatar file is required");
//   }
//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
//   if (!avatar) {
//     throw ApiError(4400, "Avatar file is required");
//   }

//   const user = await User.create({
//     fullname,
//     email,
//     username: username.toLowerCase(),
//     password,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );
//   if (!createdUser) {
//     throw new ApiError(500, "something went wrong registerUser");
//   }
//   return res
//     .status(201)
//     .json(new ApiResponse(200, "User registered successfully"));
// });

// export { registerUser };
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accesToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong, while generating acces token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log(email);

  // Check if any required field is empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // Validate avatar and coverImage
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload to Cloudinary
  console.log("Uploading avatar...");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(4400, "Failed to upload avatar");
  }

  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  // Create the user
  const user = await User.create({
    fullname,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong during registration");
  }

  // Respond with a success message
  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  //username or email
  // find user
  //compare password
  // acces and refresh token
  // send cookie

  const { email, password, username } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError9(400, "user dosent exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }
  const { accesToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpsOnly: true,
    secure: true,
  };

  return res
    .status()
    .cookie("accesToken", accesToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accesToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser };
