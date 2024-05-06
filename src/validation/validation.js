import { responseError } from "../error/resp-error.js";

const validate = (schema, req) => {
  const res = schema.validate(req, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (res.error) {
    throw new responseError(400, result.error.message);
  } else {
    return res.value;
  }
};

export { validate };
