import Router from 'express'
import * as RfController from "../controllers/RfController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = new Router();

router.get("/", RfController.getRF)
router.get("/:id", checkAuth, RfController.getOneRF)
router.post("/", checkAuth, handleValidationErrors, RfController.createRF)
router.patch("/:id", checkAuth, handleValidationErrors, RfController.updateRF)
router.delete("/:id", checkAuth, RfController.removeRF)


export default router;