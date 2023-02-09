import Router from 'express'
import authRouter from './authRouter.js'
import rfRouter from "./rfRouter.js";
import postsRouter from "./postsRouter.js";
import tagsRouter from "./tagsRouter.js";
import filesRouter from "./filesRouter.js";

const router = new Router();

router.use('/auth', authRouter)
router.use('/regulatory_framework', rfRouter)
router.use('/posts', postsRouter)
router.use('/tags', tagsRouter)
router.use('/files', filesRouter)


export default router;