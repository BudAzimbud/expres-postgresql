import express from "express";
import bodyParser from "body-parser";
import {
  createUserService,
  listUsersService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/usersService.js";
import { readFileAsync } from "../helper/file.js";
import { generateOutput } from "../helper/generateOutput.js";
import { validateUserDTO } from "./userDtoMiddleware.js";

const router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/users", async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;
  try {
    const listUsers = await listUsersService(+page, +limit);
    res.status(200).json({
      data: listUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await findUserByIdService(+userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/users", validateUserDTO, async (req, res) => {
  const body = req.body;
  try {
    const createUser = await createUserService(body);
    res.status(201).json({
      data: createUser,
    });
  } catch (error) {
    console.log(error.code);
    if (error.code === "P2002") {
      res.status(409).json({
        message: "Duplicate email",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const body = req.body;
  try {
    const updatedUser = await updateUserService(+userId, body);
    if (!updatedUser) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        data: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await deleteUserService(+userId);
    if (!deletedUser) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        data: deletedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/files", async (req, res) => {
  try {
    const fileContents = await readFileAsync("public/example.txt");
    res.json({ contents: fileContents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error reading file" });
  }
});

router.get("/output", async (req, res) => {
  try {
    const output = generateOutput(50);
    res.json({ data: output });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error reading file" });
  }
});

export default router;
