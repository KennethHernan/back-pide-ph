import { Schema, model } from "mongoose";

const requestHistorySchema = new Schema({
    owner: {
        id: String,
        username: String,
    },
    request: { type: String, required: true },
},{
    timestamps: true,
    versionKey: false,
});

export default model("RequestHistory", requestHistorySchema);