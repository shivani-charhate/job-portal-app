import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    next("Please provide name");
  }

  if (!email) {
    next("Please provide email");
  }
  if (!password) {
    next("Please provide password");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(200)
      .send({ message: "Email already register Please Login" });
  }

  const user = await userModel.create({ name, email, password });
  res.status(201).send({ message: "New User register", newUser: user });
  user;
};
