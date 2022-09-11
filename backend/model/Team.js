import mongoose from "mongoose";
const { Schema, model } = mongoose;

const teamSchema = new Schema({
  teamName: String,
  registrationDate: Date,
  groupNumber: Number,
});

const Team = model("Tean", teamSchema);

export default Team;
