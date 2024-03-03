// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import { Profile } from "./models/profile";
import * as path from "path";
import { loginUser, registerUser, authenticateUser } from "./auth";
import fs from "node:fs/promises";
import apiRouter from "./routers/api";
import profileRouter from "./routers/profiles"; 


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let dist: string | undefined;
let frontend: string | undefined;

try {
  frontend = require.resolve("lit-frontend");
  dist = path.resolve(frontend, "..", "..");
  console.log("Serving lit-frontend from", dist);
} catch (error: any) {
  console.log("Cannot find static assets in lit-frontend", dist, error.code);
}

app.post("/api/login", loginUser);
app.post("/signup", registerUser);

connect("cooked");


// BACKEND ROUTES
app.use("/api", apiRouter);

// app.use("/api/profiles", profileRouter);




// app.get("/api/profiles/:userid", (req: Request, res: Response) => {
//   const { userid } = req.params;

//   profiles
//     .get(userid)
//     .then((profile: Profile) => res.json(profile))
//     .catch((err) => res.status(404).end());
// });












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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
