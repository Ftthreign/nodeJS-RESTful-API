import { responseError } from "../error/resp-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof responseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else {
    res
      .status(400)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
