import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

interface PasswordResetTokenDocument extends mongoose.Document {
  owner: mongoose.Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
  compareToken(candidateToken: string): Promise<boolean>;
}

const PasswordResetTokenSchema =
  new mongoose.Schema<PasswordResetTokenDocument>(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        default: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
      },
    },
    {
      timestamps: true,
    }
  );

// Encrypt token using bcrypt
PasswordResetTokenSchema.pre("save", async function (next) {
  let _token = this as PasswordResetTokenDocument;

  if (!_token.isModified("token")) {
    next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(_token.token, salt);

  _token.token = hash;
  next();
});

// Compare token
PasswordResetTokenSchema.methods.compareToken = async function (token: string) {
  let _token = this as PasswordResetTokenDocument;

  return bcrypt.compare(token, _token.token).catch((e) => false);
};

const PasswordResetTokenModel = mongoose.model<PasswordResetTokenDocument>(
  "PasswordResetToken",
  PasswordResetTokenSchema
);

export default PasswordResetTokenModel;
