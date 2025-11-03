import mongoose from "mongoose";

const AnnotationSchema = new mongoose.Schema({
  id: String,
  slide: Number,
  x: Number,
  y: Number,
  text: String,
  author: String,
  color: String,
}, { _id: false });

const presentationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  presentationId: {
    type: String,
    required: true
  },
  embedUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Untitled Presentation'
  },
  thumbnail: {
    type: String,
    default: '/img/recently_1.jpg' // placeholder
  },
  lastViewed: {
    type: Date,
    default: Date.now
  },
  annotations: [AnnotationSchema],
  slideCount: { type: Number, default: 1 },

}, { timestamps: true });

const Presentation = mongoose.models.Presentation || mongoose.model("Presentation", presentationSchema);

export default Presentation;