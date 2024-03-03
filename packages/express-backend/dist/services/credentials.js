"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.checkExists = exports.verify = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const credential_1 = __importDefault(require("../models/mongo/credential"));
const profile_1 = __importDefault(require("../models/mongo/profile"));
const profiles_1 = __importDefault(require("../profiles"));
function verify(username, password) {
    return new Promise((resolve, reject) => {
        credential_1.default
            .find({ username })
            .then((found) => {
            if (found && found.length === 1)
                return found[0];
            else
                reject("Invalid username or password");
        })
            .then((credsOnFile) => {
            if (credsOnFile)
                bcryptjs_1.default.compare(password, credsOnFile.hashedPassword, (_, result) => {
                    console.log("Verified", result, credsOnFile.username);
                    if (result)
                        resolve(credsOnFile.username);
                    else
                        reject("Invalid username or password");
                });
            else
                reject("Invalid username or password");
        });
    });
}
exports.verify = verify;
function checkExists(username) {
    return new Promise((resolve, reject) => {
        credential_1.default
            .find({ username })
            .then((found) => resolve(found && found.length > 0));
    });
}
exports.checkExists = checkExists;
function createProfile(username) {
    return new Promise((resolve, reject) => {
        const newProfile = new profile_1.default({
            userid: username
        });
        profiles_1.default
            .create(newProfile)
            .catch((err) => reject(new Error("unable to create new profile for user")));
    });
}
function create(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            reject(new Error("must provide username and password"));
        }
        else {
            credential_1.default
                .find({ username })
                .then((found) => {
                if (found.length) {
                    reject(new Error("username exists"));
                }
                else {
                    return bcryptjs_1.default.genSalt(10)
                        .then((salt) => bcryptjs_1.default.hash(password, salt))
                        .then((hashedPassword) => {
                        const creds = new credential_1.default({
                            username,
                            hashedPassword
                        });
                        return creds.save();
                    })
                        .then((created) => {
                        createProfile(username);
                        resolve(created);
                    });
                }
            })
                .catch((error) => {
                reject(error);
            });
        }
    });
}
exports.create = create;
exports.default = { checkExists, create, verify };
