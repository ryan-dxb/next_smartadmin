import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  refreshToken: string[];

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Remove password and refresh token from user object and add id field
UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  user.id = user._id;
  delete user._id;
  return user;
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
