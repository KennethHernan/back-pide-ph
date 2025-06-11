import { Schema, model } from "mongoose";

const auditSchema = new Schema(
  {
    username: { type: String, required: true },
    metodo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const Audit = model("audit", auditSchema);

export default Audit;
