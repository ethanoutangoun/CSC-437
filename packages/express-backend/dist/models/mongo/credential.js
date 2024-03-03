"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const credentialSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
}, { collection: "user_credentials" });
const credentialModel = (0, mongoose_1.model)("Credential ", credentialSchema);
exports.default = credentialModel;
