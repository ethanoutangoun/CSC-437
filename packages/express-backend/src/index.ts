// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import { Profile } from "./models/profile";
import * as path from "path";
import { loginUser, registerUser } from "./auth";
import apiRouter from "./routers/api";
import recipeRouter from "./routers/recipes"

import recipes from "./recipes";
import { Recipe } from "./models/recipe";
import fs from "fs/promises";
const app = express();
const port = process.env.PORT || 3000;



let dist: string | undefined;
let frontend: string | undefined;

try {
  frontend = require.resolve("lit-frontend");
  dist = path.resolve(frontend, "..", "..");
  console.log("Serving lit-frontend from", dist);
} catch (error: any) {
  console.log(
    "Cannot find static assets in lit-frontend",
    error.code
  );
}






app.use(cors());
app.use(express.json({ limit: "5mb"}));

connect("cooked");
if (dist) app.use(express.static(dist));

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

// SPA routes ignore parameters when locating index.html
app.use("/:spa(app)", (req, res) => {
  const { spa } = req.params;

  if (!dist) {
    res.status(404).send("Not found; frontend module not loaded");
  } else {
    const indexHtml = path.resolve(dist, spa, "index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
    console.log("Sent SPA from", indexHtml);
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
