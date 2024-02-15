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
        if (existingEmailProfile) {
            throw new Error("Email already exists");
        }
        else {
            // If both user ID and email are unique, save the profile
            const p = new profile_1.default(profile);
            return p.save();
        }
    });
}
exports.default = { index, get, create };
