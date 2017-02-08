import * as mongoose from "mongoose";
import {protoUser} from "../protoUser";
var Schema = mongoose.Schema;

interface protoUserModel extends protoUser, mongoose.Document {}

var userSchema = new mongoose.Schema({
  email       : String,
  username    : String,
  password    : String,
  history     : [String]
});

var User = mongoose.model<protoUserModel>("User", userSchema);

export = User;