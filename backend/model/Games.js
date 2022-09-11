import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const gamesSchema = new Schema({
  team1Name: {
    type: SchemaTypes.ObjectId,
    ref: "Team",
    required: true,
  },
  team2Name: {
    type: SchemaTypes.ObjectId,
    ref: "Team",
    required: true,
  },
  team1Goals: Number,
  team2Goals: Number,
});

const Games = model("Games", gamesSchema);

export default Games;
