"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = __importDefault(require("./models/mongo/profile"));
function index() {
    return profile_1.default.find();
}
function get(userid) {
    return profile_1.default.findOne({ userid })
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
function create(profile) {
    // Check if the user ID already exists
    return profile_1.default.findOne({ userid: profile.userid })
        .then(existingUserIdProfile => {
        if (existingUserIdProfile) {
            throw new Error("User ID already exists");
        }
        else {
            // Check if the email already exists
            return profile_1.default.findOne({ email: profile.email });
        }
    })
        .then(existingEmailProfile => {
        if ((existingEmailProfile === null || existingEmailProfile === void 0 ? void 0 : existingEmailProfile.email) != null) {
            console.log(existingEmailProfile);
            throw new Error("Email already exists");
        }
        else {
            // If both user ID and email are unique, save the profile
            const p = new profile_1.default(profile);
            return p.save();
        }
    });
}
function update(userid, profile) {
    return new Promise((resolve, reject) => {
        profile_1.default.findOneAndUpdate({ userid }, profile, {
            new: true,
        }).then((profile) => {
            if (profile)
                resolve(profile);
            else
                reject("Failed to update profile");
        });
    });
}
exports.default = { index, get, create, update };
