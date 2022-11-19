const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String },
  slug: { type: String },
  group: { type: String },
});

const userSchema = new Schema(
  {
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, default: "", required: true, unique: true },
    email: { type: String, default: "", required: true, unique: true },
    name: { type: String },
    instaHandle: { type: String },
    ytHandle: { type: String },
    fbHandle: { type: String },
    storeName: {
      type: String,
    },
    address: { type: String },
    gst: { type: Number, default: null },
    status: { type: String, default: "pending" },
    role: [roleSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
const Role = mongoose.model("role", roleSchema);

module.exports = {
  User: User,
  Role: Role,
};
