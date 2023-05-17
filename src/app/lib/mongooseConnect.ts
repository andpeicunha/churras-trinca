import mongoose from "mongoose";

export default function connect() {
  const URI = process.env.MONGO_URI;

  if (!URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
  }

  const usersClient = mongoose.createConnection(URI);

  // User Model
  const User =
    mongoose.models.User ||
    mongoose.model(
      "User",
      new mongoose.Schema({
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        emailVerified: {
          type: String,
          required: false,
        },
        image: {
          type: String,
          required: true,
        },
      })
    );

  return { usersClient };
}
