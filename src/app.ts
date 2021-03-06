import express from "express";
import cors from "cors";

import * as recommendationController from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationController.recommendSong);

app.post("/recommendations/:id/upvote", recommendationController.upvoteSong);

app.post(
  "/recommendations/:id/downvote",
  recommendationController.downvoteSong
);

app.get("/recommendations/random", recommendationController.getRandomSong);

app.get(
  "/recommendations/top/:amount",
  recommendationController.getTopListSongs
);

export default app;
