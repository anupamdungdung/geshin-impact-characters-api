
import AdminData from "../models/userData.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
  const { adminUserName, password } = req.body; // All POST data sent in the request body

  console.log(req.body);

  try {
    const admin = await AdminData.findOne({ adminUserName });

    console.log(admin);

    if (!admin)
      return res.status(404).json({ message: "Admin does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, admin.password); //We can't normally compare because later the password will be encrypted so we have to use bcrypt.compare()
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    //If adminUserName and password are correct we will send the data using jwt

    const token = jwt.sign(
      { adminUserName: admin.adminUserName, id: admin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15m' } // 15 minutes
    );
    console.log(token);

    res.status(200).json({ admin, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
