import { Schema, model, models, Document, Types } from "mongoose";

export interface VoteCaster {
  id: string; // Reference to User
  type: "upVote" | "downVote"; // Enum to ensure only valid values
}

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: string[];
  author: Types.ObjectId;
  upVotes: number;
  downVotes: number;
  answers: Types.ObjectId[];
  views: number;
  oldTags: string[]; // just incase of editing the question it is needed
  viewedBy: string[];
  voteCastedBy: VoteCaster[];
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String, required: true }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    views: { type: Number, default: 0 },
    viewedBy: { type: [String], default: [] },
    voteCastedBy: [
      {
        id: { type: String }, // Reference to User who voted
        type: { type: String, enum: ["upVote", "downVote"], required: true }, // Enforces correct values
      },
    ],
  },

  { timestamps: true }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
