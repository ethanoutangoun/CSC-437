// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import { Profile } from "./models/profile";
import * as path from "path";
import { loginUser, registerUser } from "./auth";
import apiRouter from "./routers/api";
import recipeRouter from "./routers/recipes";
import { PathLike } from "node:fs";
import recipes from "./recipes";
import { Recipe } from "./models/recipe";
import fs from "fs/promises";
const app = express();
const port = process.env.PORT || 3000;

connect("cooked");

const frontend = "lit-frontend";
let cwd = process.cwd();
let dist: PathLike | undefined;
let indexHtml: PathLike | undefined;

try {
  indexHtml = require.resolve(frontend);
  dist = path.dirname(indexHtml.toString());
} catch (error: any) {
  console.log(`Could not resolve ${frontend}:`, error.code);
  dist = path.resolve(cwd, "packages", frontend, "dist");
  indexHtml = path.resolve(dist, "index.html");
}

console.log(`Serving ${frontend} from`, dist);

if (dist) app.use(express.static(dist));

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// BACKEND ROUTES

app.post("/api/login", loginUser);
app.post("/api/signup", registerUser);

app.use("/api", apiRouter);

app.use("/recipes", recipeRouter);

app.post("/api/profiles", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

app.put("/api/profiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newProfile = req.body;

  profiles
    .update(userid, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

// SPA route; always returns index.html
app.use("/app", (req, res) => {
  if (!indexHtml) {
    console.log("Did not findin dist");
    res
      .status(404)
      .send(`Not found; ${frontend} not available, running in ${cwd}`);
  } else {
    console.log("Found index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
