import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../profile";

const profileSchema = new Schema<Profile>(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, trim: true, default: null },
    email: { type: String, trim: true, default: null },
    phone: { type: String, trim: true, default: null },
    numRecipes: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    dateJoined: { type: Date, default: Date.now },
    picture: { data: Buffer, contentType: String },
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", profileSchema);

export default ProfileModel;
