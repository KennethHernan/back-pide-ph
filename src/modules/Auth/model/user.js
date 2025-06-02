import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    dni: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    rol: { type: Number, enum: [0, 1], required: true }, // Añadido
    lastSeen: Date,
    isOnline: Boolean,
    resetToken: String,
    resetTokenExpires: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);

export const updateUserLastSeen = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    lastSeen: new Date().toISOString(),
    isOnline: true,
  });
};

export default User;
