import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "./Password";
import { Entity } from "../models/entity";
import { UserModel, USERS_PK } from "../models/models";
import { INVALID_EMAIL, INVALID_CREDENTIALS } from "../messages/messages";

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await Entity.get({ pk: USERS_PK, sk: email });

  if (existingUser) {
    throw new BadRequestError(INVALID_EMAIL);
  }

  const user = await Entity.create({ 
    pk: USERS_PK, 
    sk: email,
    passwd: password });

  delete user.passwd;
  // Generate JWT
  const userJwt = jwt.sign(
    {
      email: user.sk,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send("OK");
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await Entity.get({ pk: USERS_PK, sk: email }) as UserModel;
  if (!existingUser) {
    throw new BadRequestError(INVALID_CREDENTIALS);
  }

  const passwordsMatch = await Password.compare(
    existingUser.passwd,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError(INVALID_CREDENTIALS);
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      email: existingUser.sk,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send("OK");
};


export { signUp, signIn };