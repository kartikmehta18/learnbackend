
import dotenv from "dotenv";
dotenv.config();
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // Fixed typo: 'lowecase' to 'lowercase'
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary services
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary services
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String, 
      required: [true, "Password is required"],  // Fixed typo
    },
    refreshToken: {
      type: String,  
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();  // Fixed condition check
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
      username: this.username,
    },
    process.env.ACCES_TOKEN_SECRET,  // Fixed typo in environment variable name
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,  // Fixed typo in environment variable name
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);














// import mongoose, { Schema } from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       lowecase: true,
//       trim: true,
//       index: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowecase: true,
//       trim: true,
//     },
//     fullname: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },
//     avatar: {
//       type: String, // coludinary services
//       required: true,
//     },
//     coverImage: {
//       type: String, // coludinary services
//     },
//     watchHistory: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Video",
//       },
//     ],
//     password: {
//       types: String,
//       required: [true, "passwoed is required"],
//     },
//     refreshToken: {
//       types: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function () {
//   jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       fullname: this.fullname,
//       username: this.username,
//     },
//     process.env.ACCES_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };
// userSchema.methods.generateRefreshToken = function () {
//   jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       fullname: this.fullname,
//       username: this.username,
//     },
//     process.env.REFERESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// export const User = mongoose.model("User", userSchema);


