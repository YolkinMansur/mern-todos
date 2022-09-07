const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Пожалуйста добавьте имя"],
    },
    email: {
      type: String,
      required: [true, "Пожалуйста добавьте email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Пожалуйста добавьте пароль"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
