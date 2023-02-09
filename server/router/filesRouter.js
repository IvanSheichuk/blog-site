import Router from 'express'
import * as FilesController from '../controllers/FilesController.js'
import checkAuth from "../utils/checkAuth.js";
import {uploadFile} from "../utils/uploadFile.js";

const router = new Router();


router.post("/upload", checkAuth, uploadFile.single("image"), FilesController.upload);

router.delete("/remove/uploads/:pic", checkAuth, FilesController.remove);

export default router