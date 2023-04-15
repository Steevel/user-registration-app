require("dotenv").config();
const User = require("../models/user.schema");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { mailHelper } = require("../utils/mailhelper");

/******************************************************
 * @SIGNUP
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/auth/signup
 * @description User Sign Up Controller for creating new user
 * @parameters name, email, password
 * @returns Success message - User created successfully
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
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
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
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/auth/login
 * @description User Sign In Controller for loging new user
 * @parameters  email, password
 * @returns Success message - User created successfully
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

/******************************************************
 * @GET_USER_DATA
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/getdata
 * @description User data controller for fetching user data
 * @parameters token
 * @returns User Info Object
 ******************************************************/

exports.getUserData = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(400)
        .send({ success: false, message: "Authorization Error" });
    }

    const data = JWT.verify(token, process.env.JWT_STRING);

    const userInfo = await User.findById(data.user.id);

    res.status(200).send({ success: true, message: userInfo });
  } catch (e) {
    res
      .status(400)
      .send({ success: true, message: "Could not retrive user data" });
  }
};

/******************************************************
 * @UPDATE_USER_DATA
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/auth/updatedata
 * @description Update data contoller for updating the user data
 * @parameters Updatedinfo object
 * @returns Success message - User updated successfully
 ******************************************************/

exports.updateUserData = async (req, res) => {
  let updatedInfo = req.body;

  if (!updatedInfo) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all fields" });
  }

  if (updatedInfo.password) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(updatedInfo.password, salt);

    updatedInfo = { ...updatedInfo, password: securePassword };
  }

  try {
    const user = await User.findByIdAndUpdate(
      updatedInfo._id,
      updatedInfo
    ).select("+password");

    return res
      .status(200)
      .send({ success: true, message: "Updated successfully" });
  } catch (err) {
    return res
      .status(400)
      .send({ success: false, message: "Could not update user data" });
  }
};

/******************************************************
 * @FORGOT_PASSWORD
 * @route http://localhost:4000/api/auth/password/
 * @description User will submit email and we will generate a reset token and password reset link
 * @parameters  email
 * @returns success message - Link sent successfully
 ******************************************************/

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Could not find user" });
    }

    // Payload
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = JWT.sign(data, process.env.JWT_STRING);

    const resetUrl = `${process.env.FRONTEND_URI}/password/reset/${token}`;
    // console.log("reset url", resetUrl);

    const emailText = `Your password reset link: ${resetUrl}`;

    await mailHelper({
      email: user.email,
      subject: "Password reset email for website",
      text: emailText,
    });

    res.status(200).send({ success: true, message: "Link sent successfully" });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
};

/******************************************************
 * @RESET_PASSWORD
 * @route http://localhost:4000/api/auth/password/reset/:token
 * @description User will submit new password along with reset token and password is reset
 * @parameters  token, newpassword
 * @returns success message - Password reset successful
 ******************************************************/

exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  const { newpassword } = req.body;

  if (!token || !newpassword) {
    return res.status(400).send({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }

  const data = JWT.verify(token, process.env.JWT_STRING);

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(newpassword, salt);

    // Update the password
    await User.findByIdAndUpdate(data.user.id, {
      password: securePassword,
    }).select("+password");

    res
      .status(200)
      .send({ success: true, message: "Successfully updated password" });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
};
