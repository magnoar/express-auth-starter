import express, { Request, Response } from "express";
import { body } from "express-validator";
import { currentUser } from "../middlewares/current-user";
import { validateRequest } from "../middlewares/validate-request";
import { signUp, signIn  } from "./controller";
import { INVALID_EMAIL, INVALID_PASSWORD } from "../messages/messages";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage(INVALID_EMAIL),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(INVALID_PASSWORD),
  ],
  validateRequest,
  signUp
);

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage(INVALID_EMAIL),
    body("password")
      .trim()
      .notEmpty()
      .withMessage(INVALID_PASSWORD),
  ],
  validateRequest,
  signIn
);

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  res.send({});
});

export { router as userRouter };
