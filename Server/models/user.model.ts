import mongoose, { Document, Model, Schema } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  adress: string,
  password: string;
  followers : [string],
  following: [string],
  findInteresting:  [String],
  findConstructive: [String],
  findFunny: [String],
  findUnpertinent: [String],
  createdAt: Date;
  updatedAt: Date;
}

interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel>(
    {
        name: {
            required: true,
            minlength: 3,
            maxlength: 35,
            unique: true,
            trim: true,
        },

        email: {
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
        },

        adress: {
            required: true,
            minlength: 10,
            maxlength: 300,
        },

        password: {
            required: true,
            max: 1024,
            minlength: 6
        },

        followers: {
        },
        
        following: {
        },

        findInteresting: {
        },

        findConstructive: {
        },

        findFunny: {
        },

        findUnpertinent: {
        },
    },
    {timestamps: true},
)

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next;
});

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Adresse mail incorrecte");
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw new Error("Mot de passe incorrect");
  }

  return user;
};

export const User = mongoose.model<IUser, IUserModel>
(
  "User",
  userSchema
);