import express from "express";
import authValidation from "../../validations/genre.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", authenticate, controllers.getAll);
router.get("/:abc", authenticate, controllers.getById);
router.get("/:id/series", authenticate, controllers.getSeriesById);
router.get("/:id/series/season", authenticate, controllers.getSeasonById);
router.post("/",  validate(authValidation.add), controllers.add);
router.patch("/:id", authenticate, controllers.update);
router.delete("/:id", authenticate, controllers.delete);
export default router;
