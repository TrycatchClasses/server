import UserSchema from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import Cookies from "cookies";

export const newUser = async (req, res) => {
  const { userName, userEmail, userPassword, userMobile } = req.body;

  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const newUser = new UserSchema({
      userName,
      userEmail,
      userPassword: hashedPassword,
      userMobile,
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
      status: false,
    });
  }
};

export const loginUser = async (req, res) => {
  const { userName, userPassword } = req.body;
  try {
    const user = await UserSchema.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
        status: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key");
    // // Create a cookies object
    // var cookies = new Cookies(req, res);

    // cookies.set("users", JSON.stringify(user));
    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
      status: false,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json({
      users: users,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
      status: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findByIdAndDelete(id);
    res.status(200).json({
      user: user,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
      status: false,
    });
  }
};
