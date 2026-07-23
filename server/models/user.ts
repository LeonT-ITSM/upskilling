import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password pre-save if modified
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// nosemgrep: generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash -- not a real hashed password, just a dummy hash to prevent timing attacks when the user is not found
const DUMMY_PASSWORD_HASH = "$2b$12$/iA2o6oM4XK1HKu7vKExeOJtnV0yy9T.QZPb4Phg7lF7gNE7hWsLi";

export function compareToDummyHash(candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, DUMMY_PASSWORD_HASH);
}

export const User: Model<IUser> = model<IUser>("User", userSchema);
