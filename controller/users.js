import express from "express";
import bodyParser from "body-parser";
import {
  createUserService,
  listUsersService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/usersService.js";

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
    const user = await findUserByIdService(userId);
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

router.post("/users", async (req, res) => {
  const body = req.body;
  try {
    const createUser = await createUserService(body);
    res.status(201).json({
      data: createUser,
    });
  } catch (error) {
    if (error.message === "duplicate email") {
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
    const updatedUser = await updateUserService(userId, body);
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
    const deletedUser = await deleteUserService(userId);
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

export default router;
