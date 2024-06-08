// src/models/instagramReel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IInstagramReel extends Document {
  platform: string;
  postId: string;
  videoUrl: string;
  imageUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  views: number;
  username: string;
  datePosted: Date;
  audioUrl?: string; // Optional, as not all Reels have music
}

const InstagramReelSchema = new Schema<IInstagramReel>({
  platform: { type: String, required: true, default: "Instagram" }, // Always 'Instagram'
  postId: { type: String, required: true },
  videoUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String, default: "" },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
  views: { type: Number, required: true },
  username: { type: String, required: true },
  datePosted: { type: Date, required: true },
  audioUrl: { type: String },
});

const InstagramReel = mongoose.model<IInstagramReel>(
  "InstagramReel",
  InstagramReelSchema,
);

export default InstagramReel;
