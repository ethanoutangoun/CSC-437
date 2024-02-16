import { Document } from "mongoose";
import { Profile } from "./models/profile";
import ProfileModel from "./models/mongo/profile";

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
  return ProfileModel.findOne({ userid })
    .then((profile) => {
      if (!profile) {
        throw new Error(`${userid} Not Found`);
      }
      return profile;
    })
    .catch((err) => {
      throw new Error(`${userid} Not Found`);
    });
}

function create(profile: Profile): Promise<Profile> {
  // Check if the user ID already exists
  return ProfileModel.findOne({ userid: profile.userid })
    .then(existingUserIdProfile => {
      if (existingUserIdProfile) {
        throw new Error("User ID already exists");
      } else {
        // Check if the email already exists
        return ProfileModel.findOne({ email: profile.email });
      }
    })

    
    .then(existingEmailProfile => {
      if (existingEmailProfile) {
        throw new Error("Email already exists");
      } else {
        // If both user ID and email are unique, save the profile
        const p = new ProfileModel(profile);
        return p.save();
      }
    });
}


function update(userid: String, profile: Profile): Promise<Profile> {
  return new Promise((resolve, reject) => {
    ProfileModel.findOneAndUpdate({ userid }, profile, {
      new: true,
    }).then((profile) => {
      if (profile) resolve(profile);
      else reject("Failed to update profile");
    });
  });
}

export default { index, get, create, update };