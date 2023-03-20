"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use(express_1.default.json());
app.use("/user", user_routes_1.default);
mongoose_1.default
    .connect("mongodb://localhost:27017/USERDATA")
    .then(() => {
    console.log("database is connected");
})
    .catch((err) => {
    console.log(err.message);
});
app.listen(5000, () => {
    console.log("server running port no 5000");
});
