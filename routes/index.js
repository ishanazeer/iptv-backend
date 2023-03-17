import express from "express";

// routes
import userRoute from "./user/index.js";
import genreRoute from "./genre/index.js";
import serviceRoute from "./series/index.js";
import seasonRoute from "./season/index.js";
import episodeRoute from "./episode/index.js";
import streamRoute from "./stream/index.js";
import fileRoute from "./file/index.js";
const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);
unProtectedRouter.use("/genre", genreRoute);
unProtectedRouter.use("/series", serviceRoute);
unProtectedRouter.use("/season", seasonRoute);
unProtectedRouter.use("/episode", episodeRoute);
unProtectedRouter.use("/stream", streamRoute);
unProtectedRouter.use("/file", fileRoute);

export { protectedRouter, unProtectedRouter };
