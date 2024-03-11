"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoConnect_1 = require("./mongoConnect");
const profiles_1 = __importDefault(require("./profiles"));
const path = __importStar(require("path"));
const auth_1 = require("./auth");
const api_1 = __importDefault(require("./routers/api"));
const recipes_1 = __importDefault(require("./routers/recipes"));
const promises_1 = __importDefault(require("fs/promises"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
let dist;
let frontend;
try {
    frontend = require.resolve("lit-frontend");
    dist = path.resolve(frontend, "..", "..");
    console.log("Serving lit-frontend from", dist);
}
catch (error) {
    console.log("Cannot find static assets in lit-frontend", error.code);
}
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "5mb" }));
(0, mongoConnect_1.connect)("cooked");
if (dist)
    app.use(express_1.default.static(dist));
// BACKEND ROUTES
app.post("/api/login", auth_1.loginUser);
app.post("/api/signup", auth_1.registerUser);
app.use("/api", api_1.default);
app.use("/recipes", recipes_1.default);
app.post("/api/profiles", (req, res) => {
    const newProfile = req.body;
    profiles_1.default
        .create(newProfile)
        .then((profile) => res.status(201).send(profile))
        .catch((err) => res.status(500).send(err));
});
app.put("/api/profiles/:userid", (req, res) => {
    const { userid } = req.params;
    const newProfile = req.body;
    profiles_1.default
        .update(userid, newProfile)
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).end());
});
// SPA routes ignore parameters when locating index.html
app.use("/:spa(app)", (req, res) => {
    const { spa } = req.params;
    if (!dist) {
        res.status(404).send("Not found; frontend module not loaded");
    }
    else {
        const indexHtml = path.resolve(dist, spa, "index.html");
        promises_1.default.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
        console.log("Sent SPA from", indexHtml);
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
