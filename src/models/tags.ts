import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  title: string;
  questions: number;
  description: string;
}

const TagSchema = new Schema<ITag>(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
