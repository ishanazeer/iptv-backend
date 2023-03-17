import express from "express";
import authValidation from "../../validations/episode.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", authenticate, controllers.getAll);
router.get("/:id", authenticate, controllers.getById);
router.get("/:id/stream", authenticate, controllers.getAllStreams);
router.post("/:id/stream", authenticate, controllers.addStreamById);
router.post("/",validate(authValidation.add), controllers.add);
router.patch("/:id", authenticate,controllers.update);
router.delete("/:id",authenticate,controllers.delete);
export default router;
