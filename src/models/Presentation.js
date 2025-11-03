import mongoose from "mongoose";

const presentationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  presentationId: { type: String, required: true },
  embedUrl: { type: String, required: true },
  title: { type: String, default: "Untitled Presentation" },
  thumbnail: { type: String, default: "/img/recently_1.jpg" },
  lastViewed: { type: Date, default: Date.now }
}, { timestamps: true });

presentationSchema.index({ userId: 1, presentationId: 1 }, { unique: true });

const Presentation = mongoose.models.Presentation || mongoose.model("Presentation", presentationSchema);
export default Presentation;