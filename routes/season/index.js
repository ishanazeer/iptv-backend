import express from "express";
import authValidation from "../../validations/season.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", authenticate, controllers.getAll);
router.get("/:id",authenticate,  controllers.getById);
router.get("/:id/episode",authenticate,  controllers.getAllEpisodes);
router.post("/", validate(authValidation.add),controllers.add);
router.patch("/:id", authenticate, controllers.update);
router.delete("/:id",authenticate, controllers.delete);
export default router;
