import express from "express";
import cors from "cors";

import * as recommendationControlller from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationControlller.recommendASong())

export default app;
