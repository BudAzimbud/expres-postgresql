import express from "express";
import bodyParser from "body-parser";
import { createUserService, listUserService } from "../services/users.js";
const router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/users", async (req, res) => {
  const listUser = await listUserService();
  res.status(200).json({
    data: listUser,
  });
});

router.get("/users/:id", (req, res) => {
  res.status(200).json({
    data: {},
  });
});

router.post("/users", async (req, res) => {
  const body = req.body;
  try {
    const createUser = await createUserService(body);
    res.status(201).json({
      data: createUser,
    });
  } catch (error) {
    res.status(409).json({
      message: "duplicate email",
    });
  }
});

router.put("/users", (req, res) => {
  res.status(200).json({
    data: {},
  });
});

router.delete("/users", (req, res) => {
  res.status(200).json({
    data: {},
  });
});

export default router;
