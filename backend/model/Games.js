import mongoose from "mongoose";
const { Schema, SchemaType, model } = mongoose;

const gamesSchema = new Schema({
  team1Name: {
    type: SchemaType.ObjectId,
    ref: "Team",
    required: true,
  },
  team2Name: {
    type: SchemaType.ObjectId,
    ref: "Team",
    required: true,
  },
  team1Goals: Number,
  team2Goals: Number,
});

const Games = model("Games", gamesSchema);

export default Games;
