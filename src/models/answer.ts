import { Schema, model, models, Document, Types } from "mongoose";

interface VoteCaster {
  id: string; // Reference to User
  type: "upVote" | "downVote"; // Enum to ensure only valid values
}

export interface IAnswer extends Document {
  content: string;
  author: Types.ObjectId;
  questionId: string;
  upVotes: number;
  downVotes: number;
  voteCastedBy: VoteCaster[];
}

const AnswerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questionId: { type: String, required: true },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    voteCastedBy: [
      {
        id: { type: String }, // Reference to User who voted
        type: { type: String, enum: ["upVote", "downVote"], required: true }, // Enforces correct values
      },
    ],
  },
  { timestamps: true }
);

const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
