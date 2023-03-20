import express from "express";
const router = express.Router();
import { auth } from "../controller/middleware";
import {
  createUser,
  getAllUserData,
  getUserDataByEmail,
  getUserDataByid,
  UpdateUserData,
  DeleteUserData,
  UserLogin,
  authentication,
} from "../controller/user.control";

// ALL user ROUTES
router.get("/auth", auth, authentication);
router.get("/", getUserDataByEmail);
router.get("/getuser/:id", getUserDataByid);
router.get("/getusers", getAllUserData);
router.post("/create", createUser);
router.post("/login", UserLogin);
router.put("/update/:id", UpdateUserData);
router.delete("/delete/:id", DeleteUserData);

export default router;
