import express from "express";
import { submitReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID",submitReview)

export default reviewRouter;