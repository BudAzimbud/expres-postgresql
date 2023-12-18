import express from "express";
import {
  createUserService,
  findUserByEmailService,
  updateUserByEmailService,
} from "../services/usersService.js";
import {
  validateResetPasswordDTO,
  validateUserDTO,
} from "./userDtoMiddleware.js";
import { EventEmitter } from "events";
import { sendEmail } from "../services/mail/mailService.js";
import { signToken, verifiedToken } from "../services/auth/jwtService.js";
import { comparePassword } from "../services/auth/hashService.js";
const eventEmitter = new EventEmitter();

eventEmitter.on("send_email", ({ to, name, instructions, text, link }) => {
  sendEmail({ to, name, instructions, text, link });
});

const router = express.Router();

router.post("/signup", validateUserDTO, async (req, res) => {
  const body = req.body;
  const fullUrl = req.protocol + "://" + req.get("host");
  const confirmationLink =
    fullUrl + "/api/auth/verified/" + signToken({ email: body.email });
  try {
    const createUser = await createUserService(body);
    eventEmitter.emit("send_email", {
      to: body.email,
      name: body.email,
      instructions: "Confirm your account",
      text: "Verification",
      link: confirmationLink,
    });
    res.status(201).json({
      data: createUser,
    });
  } catch (error) {
    console.log(error);
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

router.get("/verified/:token", async (req, res) => {
  const verified = verifiedToken(req.params.token);
  if (verified) {
    await updateUserByEmailService(verified.email, { verified: true });
    res.json({
      token: "Success Confirmation",
    });
  }

  res
    .json({
      token: "Invalid link confirmation",
    })
    .status(400);
});

router.post("/signin", async (req, res) => {
  const findUser = await findUserByEmailService(req.body.email);
  if (await comparePassword(req.body.password, findUser.password)) {
    delete findUser.password;
    return res.json({
      access_token: signToken(findUser, "1d"),
    });
  }
  res
    .json({
      message: "Wrong password",
    })
    .status(401);
});

router.post("/forget-password", async (req, res) => {
  const body = req.body;
  const findUser = await findUserByEmailService(req.body.email);
  const fullUrl = req.protocol + "://" + req.get("host");
  const confirmationLink =
    fullUrl +
    "/api/auth/reset-link/" +
    signToken({ email: findUser.email, forgetPassword: true }, "1h");
  if (findUser) {
    eventEmitter.emit("send_email", {
      to: body.email,
      name: body.email,
      instructions: "Reset password",
      text: "Follow this link",
      link: confirmationLink,
    });
  }

  res.json({
    message: "Check you email",
  });
});

router.post("/reset-password", validateResetPasswordDTO, async (req, res) => {
  const verified = verifiedToken(req.body.token);
  if (verified && verified.forgetPassword) {
    await updateUserByEmailService(verified.email, {
      password: req.body.password,
    });
    return res.json({ Message: "Success" });
  }
  res
    .json({
      message: "Invalid reset password or expired",
    })
    .status(400);
});

router.post("refresh-token", async (req, res) => {
  const verified = verifiedToken(req.body.token);
  if (verified) {
    return res.json({ token: signToken(verified, "1h") });
  }
  res.json({ message: "Unauthenthicated" }).status(401);
});

export default router;
