import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    title: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now }
});

const project_model = mongoose.model("Projects", projectSchema);

export default project_model;
