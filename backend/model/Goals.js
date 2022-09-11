import mongoose from "mongoose";
const { Schema, SchemaType, model } = mongoose;

const goalsSchema = new Schema({
  teamName: {
    type: SchemaType.ObjectId,
    ref: "Team",
    required: true,
  },
  goals: Number,
});

const Goals = model("Goals", goalsSchema);

export default Goals;
