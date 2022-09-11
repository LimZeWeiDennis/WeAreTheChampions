import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const scoresSchema = new Schema({
  teamName: {
    type: SchemaTypes.ObjectId,
    ref: "Team",
    required: true,
  },
  scores: Number,
});

const Scores = model("Scores", scoresSchema);

export default Scores;
