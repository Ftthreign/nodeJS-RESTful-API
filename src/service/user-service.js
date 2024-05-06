import { prismaClient } from "../application/database.js";
import { registerUserValidation } from "../validation/user-validate.js";
import { validate } from "../validation/validation.js";
import { responseError } from "../error/resp-error.js";
import bcrypt from "bcrypt";

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

export default {
  register,
};
