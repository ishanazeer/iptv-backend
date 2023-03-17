import express from "express";
import authValidation from "../../validations/series.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", authenticate, controllers.getAll);
router.get("/:id", authenticate, controllers.getById);
router.get("/:id/season",authenticate,  controllers.getSeasonById);
router.get("/:id/season/episode",authenticate,  controllers.getAllEpisodes);
router.post("/", validate(authValidation.add),controllers.add);
router.patch("/:id",authenticate,  controllers.update);
router.delete("/:id", authenticate,controllers.delete);
export default router;
