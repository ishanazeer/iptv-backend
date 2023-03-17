import express from "express";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";


const router = express.Router();

router.get("/", controllers.getAll);
router.get("/:image_link", controllers.findOne);
router.post("/",upload.single("file"), controllers.add);
router.patch("/:id",controllers.update);
router.delete("/:id",controllers.delete);
export default router;