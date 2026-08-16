import { body } from "express-validator";

const userRegisterValidator = () => {
  return [body("email").trim().notEmpty().withMessage];
};

export { userRegisterValidator };
