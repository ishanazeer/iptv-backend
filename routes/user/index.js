import express from "express";
import authValidation from "../../validations/user.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/",  authenticate,controllers.getAll);
router.get("/:abc", authenticate, controllers.getById);
router.get("/:id/stream", authenticate, controllers.getAllStreams);
router.get("/:id/stream/:streamId", authenticate, controllers.getAllStreamsByBothIds);
router.post("/registration", validate(authValidation.add), controllers.add);
router.post("/login",  authenticate,controllers.login);
router.patch("/:id",  authenticate,controllers.update);
router.delete("/:id", authenticate,controllers.delete);
export default router;
