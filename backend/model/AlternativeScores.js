import mongoose from "mongoose";
const { Schema, model } = mongoose;

const alternativeScoreSchema = new Schema({
  teamId: String,
  scores: Number,
});

const AltScores = model("AltScores", alternativeScoreSchema);

export default AltScores;
