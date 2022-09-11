import mongoose from "mongoose";
const { Schema, SchemaType, model } = mongoose;

const scoresSchema = new Schema({
  teamName: {
    type: SchemaType.ObjectId,
    ref: "Team",
    required: true,
  },
  scores: Number,
});

const Scores = model("Scores", scoresSchema);

export default Scores;
