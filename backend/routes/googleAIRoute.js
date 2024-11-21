import express from "express";
import GeminiAIController from "../controllers/openAIController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const googleAIRouter = express.Router();

googleAIRouter.post("/", isAuthenticated, GeminiAIController);

export default googleAIRouter;
