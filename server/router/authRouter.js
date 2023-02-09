import {loginValidation} from "../utils/validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import * as UserController from "../controllers/UserController.js";
import checkAuth from "../utils/checkAuth.js";
import Router from "express";

const router = new Router();

router.post("/login", loginValidation, handleValidationErrors, UserController.login);
router.get("/me", checkAuth, UserController.getMe);


export default router;
