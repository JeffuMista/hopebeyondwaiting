const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const bookingRouter = require("./routes/BookingRoute");
const centerRouter = require("./routes/CenterRoute");
const userRouter = require("./routes/UserRoute");

dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "PUT", "POST", "DELETE"]
}));

app.use(express.json());

app.get("/", (req, res) => res.send("HopeBeyondWaiting API up and running..."));
app.use("/api/bookings", bookingRouter);
app.use("/api/centers", centerRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API is on http://localhost:${PORT}`));
