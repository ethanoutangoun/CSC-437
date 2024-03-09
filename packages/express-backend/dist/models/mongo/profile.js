"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    userid: { type: String, required: true, trim: true },
    name: { type: String, trim: true, default: null },
    email: { type: String, trim: true, default: null },
    phone: { type: String, trim: true, default: null },
    numRecipes: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    dateJoined: { type: Date, default: Date.now },
    picture: { data: Buffer, contentType: String },
}, { collection: "user_profiles" });
const ProfileModel = (0, mongoose_1.model)("Profile", profileSchema);
exports.default = ProfileModel;
