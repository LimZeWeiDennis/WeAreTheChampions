import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const scoresSchema = new Schema({
  teamId: String,
  scores: Number,
});

const Scores = model("Scores", scoresSchema);

export default Scores;
