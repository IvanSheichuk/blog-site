import Router from 'express'
import * as PostController from "../controllers/PostController.js";

const router = new Router();

router.get("/", PostController.getLastTags);
router.get("/:tag", PostController.getByTag);

export default router;