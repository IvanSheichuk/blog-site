import Router from 'express'
import * as PostController from "../controllers/PostController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = new Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.post("/", checkAuth, handleValidationErrors, PostController.create);
router.patch("/:id", checkAuth, handleValidationErrors, PostController.update);
router.delete("/:id", checkAuth, PostController.remove);

export default router;