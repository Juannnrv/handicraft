const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      match: [/^\+\d{2}\s?\d{10}$/, "Phone number must include country code and be in the format +XX XXXXXXXXXX"],
      unique: true,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      required: [false, "Password is required"],
    },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg",
    },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "na"],
    },
    birthday: {
      type: Date,
    },
    googleId: { type: String, unique: true, sparse: true },
    discordId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    favorites: {
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      workshops: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workshop",
        },
      ],
    },
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    workshopsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
      },
    ],
    coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
      },
    ],
  },
  {
    collection: "user",
  }
);

userSchema.path("email").validate(function (value) {
  return value || this.phone;
}, "Either email or phone must be provided.");

userSchema.path("phone").validate(function (value) {
  return value || this.email;
}, "Either email or phone must be provided.");

const User = mongoose.model("User", userSchema);

module.exports = User;
