"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
mongoose_1.default.set("debug", true);
dotenv_1.default.config();
function getMongoURI(dbname) {
    let connection_string = `mongodb://localhost:27017/${dbname}`;
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
    if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
        console.log("Connecting to MongoDB at", `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${dbname}`);
        connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
    }
    else {
        console.log("Connecting to MongoDB at ", connection_string);
    }
    return connection_string;
}
function connect(dbname) {
    mongoose_1.default.connect(getMongoURI(dbname)).catch((error) => console.log(error));
}
exports.connect = connect;
