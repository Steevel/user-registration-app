const User = require("../models/user.schema");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

/******************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User Sign Up Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: securePassword,
    });

    // Retrive user id and store it in 'data' for creating a web token
    const data = {
      user: {
        id: newUser.id,
      },
    };

    // sign 'data' with JWT_STRING to create a token
    const authtoken = JWT.sign(data, process.env.JWT_STRING);
    res.cookie("jwt", authtoken, {
      expire: new Date() + 9999,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

/******************************************************
 * @LOGIN
 * @route http://localhost:4000/api/auth/login
 * @description User Sign In Controller for loging new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // If the password is valid create a token
    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = JWT.sign(data, process.env.JWT_STRING);

    res.cookie("jwt", authtoken, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res
      .status(200)
      .send({ success: true, message: "User logged in successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
