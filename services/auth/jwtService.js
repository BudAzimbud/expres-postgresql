import jwt from "jsonwebtoken";
import { privateKey } from "../../config/environtment.js";

export const signToken = (payload, expiresIn) => {
  let options = {};
  if (expiresIn) {
    options = { expiresIn:expiresIn };
  }
  return jwt.sign(payload, privateKey, options);
};

export const verifiedToken = (token) => {
    return jwt.verify(token,privateKey)
}
