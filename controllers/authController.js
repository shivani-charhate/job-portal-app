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

  const token = user.createJWT();
  res.status(201).send({
    message: "New User register",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },

    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide all fields");
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!email) {
    next("Invalid userName , Password");
  }
  const isMatch = await user.comparePassword(password);
  if (!password) next("Invalid userName & Password");
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    message: "Login Sucessfully",
    user,

    token,
  });
  console.log(user);
};
