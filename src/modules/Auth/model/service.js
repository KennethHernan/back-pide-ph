import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    service: { type: String, required: true },
    active: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const Service = model("service", serviceSchema);

export default Service;
