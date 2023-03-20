"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const middleware_1 = require("../controller/middleware");
const user_control_1 = require("../controller/user.control");
// ALL user ROUTES
router.get("/auth", middleware_1.auth, user_control_1.authentication);
router.get("/", user_control_1.getUserDataByEmail);
router.get("/getuser/:id", user_control_1.getUserDataByid);
router.get("/getusers", user_control_1.getAllUserData);
router.post("/create", user_control_1.createUser);
router.post("/login", user_control_1.UserLogin);
router.put("/update/:id", user_control_1.UpdateUserData);
router.delete("/delete/:id", user_control_1.DeleteUserData);
exports.default = router;
