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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "12345rtf";
const db_1 = require("./db");
const app = (0, express_1.default)();
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    yield db_1.UserModel.create({ username, password });
    res.json({ message: "User created" });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password,
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET);
        res.json({ token });
    }
    else {
        res.status(409).json({ message: "Invalid credentials" });
    }
}));
app.post("/api/v1/content", (req, res) => { });
app.delete("/api/v1/content", (req, res) => { });
app.get("/api/v1/content", (req, res) => { });
app.post("/api/v1/brain/:shareLink", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
app.get;
app.listen(3001);
