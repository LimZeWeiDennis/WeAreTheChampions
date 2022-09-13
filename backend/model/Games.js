import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const gamesSchema = new Schema({
  team1Name: SchemaTypes.ObjectId,
  team2Name: SchemaTypes.ObjectId,
  team1Goals: Number,
  team2Goals: Number,
});

const Games = model("Games", gamesSchema);

export default Games;
