import express from "express";
import authValidation from "../../validations/stream.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", authenticate, controllers.getAll);
router.get("/:abc", authenticate, controllers.getById);
router.get("/:id/episode", authenticate, controllers.getAllEpisodes);
router.get("/:id/user", authenticate, controllers.getAllUsers);
router.get("/:id/episode/season", authenticate, controllers.getAllSeasonsOfEpisode);
router.get("/:id/episode/season/series", authenticate, controllers.getAllSeasonsOfEpisodeOfSeries);
router.get("/:id/episode/season/series/genre", authenticate, controllers.getAllSeasonsOfEpisodeOfSeriesOfGenre);
router.post("/",validate(authValidation.add), controllers.add);
router.patch("/:id", authenticate, controllers.update);
router.delete("/:id",authenticate, controllers.delete);
export default router;
