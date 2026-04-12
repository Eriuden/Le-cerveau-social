
import mongoose, { Schema, Document, model } from 'mongoose';

export interface IConversation extends Document {
  participants : Schema.Types.ObjectId,
  lastMessage : Schema.Types.ObjectId,
  lastMessageAt : Date
}

export interface IMessage extends Document {
  conversation : Schema.Types.ObjectId,
  sender : Schema.Types.ObjectId,
  content : string,
  read : Boolean,
  readAt : Date
}

const conversationSchema = new Schema(
  {
    participants: [{
      ref: 'User',
      required: true
    }],
    lastMessage: {
      ref: 'Message'
    },
    lastMessageAt: {
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);

const messageSchema = new Schema(
  {
    conversation: {
      ref: 'Conversation',
      required: true
    },
    sender: {
      ref: 'User',
      required: true
    },
    content: {
      required: true,
      trim: true
    },
    read: {
      default: false
    },
    readAt: {
    }
  },
  {
    timestamps: true
  }
);


messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });

export const Message = model<IConversation,IMessage>('Message', messageSchema);