import mongoose from "mongoose";
const { Schema, model } = mongoose;

const scoresSchema = new Schema({
  teamName: String,
  scores: Number,
});

const Scores = model("Scores", scoresSchema);

export default Scores;
