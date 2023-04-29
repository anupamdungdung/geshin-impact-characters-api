import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import characterRoutes from "./routes/characters.js";
import userRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 8000;
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use((req, res, next) => {
  // Giving access to anyone requesting the API
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

// Default Landing Page
// app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.json({
    apiName: "Genshin Impact Characters API",
    description:
      "Add /characters to get the data of all the characters. While fetching use the specific index to fetch the data of the particualr character. (Note: Index starts from 0)",
    createdBy: "Anupam Dungdung",
    email: "anupam-d2@live.com",
  });
});

// Routes which should handle request
app.use("/characters", characterRoutes);
app.use("/user", userRoutes);

// Handle every request that reaches this line
app.use((req, res, next) => {
  const error = new Error("Query Not Found");
  error.status = 404;
  // next(error);
  res.sendStatus(404).json({ error: "Invalid Query" });
});

// Error thrown from anywhere else
app.use((error, req, res, next) => {
  res.sendStatus(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

// app.listen(PORT, () => {
//     console.log(`Listening to Port ${PORT}`);
// })

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false)
