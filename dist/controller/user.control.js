"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserData = exports.UpdateUserData = exports.getAllUserData = exports.getUserDataByid = exports.getUserDataByEmail = exports.UserLogin = exports.createUser = exports.authentication = void 0;
const user_schema_1 = __importDefault(require("../model/user.schema"));
require("dotenv").config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_validation_1 = require("../validation/user.validation");
const authentication = (req, res) => {
    res.status(200).json({ message: "user authentication", users: req.user });
};
exports.authentication = authentication;
// ------------------------User create API------------------------
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_validation_1.registervalidation)(req.body);
    if (error) {
        res.send(error.details[0].message);
        return;
    }
    const emailexist = yield user_schema_1.default.findOne({ user_email: req.body.user_email });
    if (emailexist)
        return res.status(400).json({ message: "email alredy exists" });
    try {
        const hashpassword = yield bcryptjs_1.default.hash(req.body.user_password, 12);
        const data = new user_schema_1.default({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: hashpassword,
            user_mobile_no: req.body.user_mobile_no,
            user_city: req.body.user_city,
        });
        const userdata = yield data.save();
        res
            .status(200)
            .json({ message: "data succesfully created", data: userdata });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
// ------------------------User Login API------------------------
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_validation_1.loginvalidation)(req.body);
    if (error) {
        res.send(error.details[0].message);
        return;
    }
    try {
        const CheckEmail = yield user_schema_1.default.findOne({
            user_email: req.body.user_email,
        });
        if (!CheckEmail)
            return res.status(400).json({ message: "Email Not Found" });
        const CheckPassword = yield bcryptjs_1.default.compare(req.body.user_password, CheckEmail.user_password);
        if (!CheckPassword) {
            return res.status(400).json({ message: "invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: CheckEmail.id }, `${process.env.SECRET_TOKEN}`, {
            expiresIn: "365d",
        });
        console.log(process.env.SECRET_TOKEN);
        res
            .header("auth-token", token)
            .json({ message: "login successfully", token: token });
    }
    catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
});
exports.UserLogin = UserLogin;
// ------------------------User GET DATA BY EMAIL ID API------------------------
const getUserDataByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.query.user_email;
        const userdata = yield user_schema_1.default.find({
            user_email: { $in: data },
        });
        res.status(200).json({ message: "data succesfully fetch", data: userdata });
    }
    catch (error) {
        console.log("error1", error.message);
        // console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.getUserDataByEmail = getUserDataByEmail;
// ------------------------User GET DATA BY  ID API------------------------
const getUserDataByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.params.id;
        const userdata = yield user_schema_1.default.findById(data);
        res.status(200).json({ message: "data succesfully fetch", data: userdata });
    }
    catch (error) {
        console.log("error2", error);
        res.status(400).json({ message: error.message });
    }
});
exports.getUserDataByid = getUserDataByid;
// ------------------------User ALL GET DATA  API------------------------
const getAllUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alluserdata = yield user_schema_1.default.find();
        res
            .status(200)
            .json({ message: "data succesfully fetch", data: alluserdata });
    }
    catch (error) {
        console.log("error3", error);
        res.status(400).json({ message: error.message });
    }
});
exports.getAllUserData = getAllUserData;
// ------------------------User UPDATE API------------------------
const UpdateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_validation_1.updatevalidation)(req.body);
    if (error) {
        res.send(error.details[0].message);
        return;
    }
    try {
        const id = req.params.id;
        const data = {
            user_mobile_no: req.body.user_mobile_no,
            user_city: req.body.user_city,
        };
        const UpdateUserData = yield user_schema_1.default.findByIdAndUpdate(id, data);
        res
            .status(200)
            .json({ message: "data succesfully updated", data: UpdateUserData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});
exports.UpdateUserData = UpdateUserData;
// ------------------------User DELETE  API------------------------
const DeleteUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const DeleteUserData = yield user_schema_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "data succesfully deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});
exports.DeleteUserData = DeleteUserData;
