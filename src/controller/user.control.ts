import { RequestHandler } from "express";
import USER, { UserModel } from "../model/user.schema";
require("dotenv").config();

import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import {
  registervalidation,
  loginvalidation,
  updatevalidation,
} from "../validation/user.validation";

export const authentication: RequestHandler = (req: any, res) => {
  res.status(200).json({ message: "user authentication", users: req.user });
};

// ------------------------User create API------------------------

export const createUser: RequestHandler = async (req, res) => {
  const { error } = registervalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  const emailexist = await USER.findOne({ user_email: req.body.user_email });
  if (emailexist)
    return res.status(400).json({ message: "email alredy exists" });
  try {
    const hashpassword = await bcrypt.hash(req.body.user_password, 12);

    const data = new USER({
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_password: hashpassword,
      user_mobile_no: req.body.user_mobile_no,
      user_city: req.body.user_city,
    });
    const userdata = await data.save();
    res
      .status(200)
      .json({ message: "data succesfully created", data: userdata });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// ------------------------User Login API------------------------

export const UserLogin: RequestHandler = async (req, res) => {
  const { error } = loginvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  try {
    const CheckEmail: any = await USER.findOne({
      user_email: req.body.user_email,
    });
    if (!CheckEmail)
      return res.status(400).json({ message: "Email Not Found" });
    const CheckPassword = await bcrypt.compare(
      req.body.user_password,
      CheckEmail.user_password
    );
    if (!CheckPassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { id: CheckEmail.id },
      `${process.env.SECRET_TOKEN}`,
      {
        expiresIn: "365d",
      }
    );
    console.log(process.env.SECRET_TOKEN);
    res
      .header("auth-token", token)
      .json({ message: "login successfully", token: token });
  } catch (error: any) {
    console.log(error.message);
    res.json(error.message);
  }
};

// ------------------------User GET DATA BY EMAIL ID API------------------------

export const getUserDataByEmail: RequestHandler = async (req, res) => {
  try {
    const data = req.query.user_email;

    const userdata = await USER.find({
      user_email: { $in: data },
    });

    res.status(200).json({ message: "data succesfully fetch", data: userdata });
  } catch (error: any) {
    console.log("error1", error.message);

    // console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
// ------------------------User GET DATA BY  ID API------------------------

export const getUserDataByid: RequestHandler = async (req, res) => {
  try {
    const data: string = req.params.id;

    const userdata = await USER.findById(data);

    res.status(200).json({ message: "data succesfully fetch", data: userdata });
  } catch (error: any) {
    console.log("error2", error);

    res.status(400).json({ message: error.message });
  }
};
// ------------------------User ALL GET DATA  API------------------------

export const getAllUserData: RequestHandler = async (req, res) => {
  try {
    const alluserdata = await USER.find();
    res
      .status(200)
      .json({ message: "data succesfully fetch", data: alluserdata });
  } catch (error: any) {
    console.log("error3", error);
    res.status(400).json({ message: error.message });
  }
};
// ------------------------User UPDATE API------------------------

export const UpdateUserData: RequestHandler = async (req, res) => {
  const { error } = updatevalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
    return;
  }
  try {
    const id: string = req.params.id;

    const data = {
      user_mobile_no: req.body.user_mobile_no,
      user_city: req.body.user_city,
    };

    const UpdateUserData = await USER.findByIdAndUpdate(id, data);

    res
      .status(200)
      .json({ message: "data succesfully updated", data: UpdateUserData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
// ------------------------User DELETE  API------------------------

export const DeleteUserData: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;

    const DeleteUserData = await USER.findByIdAndDelete(id);

    res.status(200).json({ message: "data succesfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
