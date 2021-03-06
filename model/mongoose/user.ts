import * as mongoose from "mongoose";
import {protoUser} from "../protoUser";
var Schema = mongoose.Schema;

interface protoUserModel extends protoUser, mongoose.Document {}

var userSchema = new mongoose.Schema({
  email       : { type: String, unique: true },
  username    : String,
  password    : String,
});

var User = mongoose.model<protoUserModel>("User", userSchema);

export = User;
