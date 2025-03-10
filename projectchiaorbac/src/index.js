//require("dotenv").config({path: "./env"});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import { config } from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
config();

dotenv.config({ path: "./env" });


connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on port", process.env.PORT);
  });
})
.catch((error) => {
    console.log("ERROR mongo db connections failed", error);
})






























// (async () => {
//   try {
//     await mongoose.connect(`$(process.env.MONGO_URI)/${DB_NAME}`);
//     app.on("error", () => {
//       console.log("error", error);
//       throw err;
//     });

//     app.listen(process.env.PORT,()=>{
//         console.log("server is running on port", process.env.PORT);
//     })
//   } catch (error) {
//     console.log("ERROR", error);
//     throw err;
//   }
// })();
