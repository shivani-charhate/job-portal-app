import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Please provide name" });
    }

    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }
    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "Email already register Please Login" });
    }

    const user = await userModel.create({ name, email, password });
    res.status(201).send({ message: "User register" });
    user;
  } catch (error) {
    res.status(400).send({ message: "Error in register", error });
  }
};
