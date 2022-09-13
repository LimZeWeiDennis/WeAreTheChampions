import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const goalsSchema = new Schema({
  teamName: String,
  goals: Number,
});

const Goals = model("Goals", goalsSchema);

export default Goals;
