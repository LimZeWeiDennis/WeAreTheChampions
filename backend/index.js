import mongoose from "mongoose";
import Registration from "./model/Registration.js";

const url =
  "mongodb+srv://Cluster74625:fVNSZ1lEbEdW@cluster74625.f2vnm3n.mongodb.net/myFirstDataBase?retryWrites=true&w=majority";

mongoose.connect(url);

const register = await Registration.create({
  teamName: "TeamA",
  registrationDate: new Date("2021-11-20T12:05:45"),
  groupNumber: 1,
});

console.log(register);

register.teamName = "ATeam";
await register.save();
console.log(register);

const get = await Registration.find({ teamName: "ATeam" }).exec();
console.log(get);
