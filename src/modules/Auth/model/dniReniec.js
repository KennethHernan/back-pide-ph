import { Schema, model } from "mongoose";

const dniReniecSchema = new Schema(
  {
    email: { type: String, required: true },
    dni: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const dniReniec = model("dniReniec", dniReniecSchema);

export default dniReniec;
