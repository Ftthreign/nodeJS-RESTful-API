import { prismaClient } from "../application/database.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validate.js";
import { validate } from "../validation/validation.js";
import { responseError } from "../error/resp-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (req) => {
  const user = validate(registerUserValidation, req);
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });
  if (countUser === 1) {
    throw new responseError(400, "User Already Exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });

  return result;
};

const login = async (req) => {
  const loginReq = validate(loginUserValidation, req);
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginReq.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new responseError(401, "Username or Password Wrong");
  }

  const checkPassValid = await bcrypt.compare(loginReq.password, user.password);
  if (!checkPassValid) {
    throw new responseError(401, "Username or Password Wrong");
  }

  const setToken = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: setToken,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new responseError(404, "user is not found");
  }

  return user;
};

export default {
  register,
  login,
  get,
};
