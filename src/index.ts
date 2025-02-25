import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_SECRET = "12345rtf";
import { UserModel } from "./db";
const app = express();
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await UserModel.create({ username, password });
  res.json({ message: "User created" });
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(409).json({ message: "Invalid credentials" });
  }
});
app.post("/api/v1/content", (req, res) => {});
app.delete("/api/v1/content", (req, res) => {});
app.get("/api/v1/content", (req, res) => {});
app.post("/api/v1/brain/:shareLink", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});
app.get;

app.listen(3000);
