import { Document, model, Schema } from "mongoose";

export interface Ipost extends Document {
  posterId: string;
  message: string;
  picture: string;
  video: string,
  interesting:  [String],
  constructive: [String],
  funny: [String],
  unpertinent: [String],
  comments : [
    commenterId: string,
    commenterName : string,
    text: string,
    timestamp: Number
  ],
  
}

const PostSchema = new Schema<Ipost>(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500
        },
        picture: {
            type:String,
        },
        video: {
            type: String,
        },
        interesting: {
            type: [String],
            required: true,
        },
        constructive: {
            type: [String],
            required: true,
        },
        funny: {
            type: [String],
            required: true,
        },
        unpertinent: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const PostModel = model<Ipost>('post',PostSchema)