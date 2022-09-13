import mongoose from "mongoose";
const { Schema, model } = mongoose;

const alternativeScoreSchema = new Schema({
  teamName: String,
  scores: Number,
});

const AltScores = model("AltScores", alternativeScoreSchema);

export default AltScores;
