const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo Db Connected");
  } catch (error) {
    console.log("Mongo DB Error:", error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
