import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     message: "ok chai or code",
//   });
const {fullname, email, username, password} = req.body;
console.log(email)
;});

export { registerUser };
