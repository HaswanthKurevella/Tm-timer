import express from "express";
import cors from "cors";
import { db, connectToDB } from "./db.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://toastmasters-time-keeper.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("server running successfully");
});

app.get("/members", async (req, res) => {
  try {
    const details = await db.collection("members").find().toArray();
    res.json(details);
  } catch (error) {
    console.error("Error fetching members:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

app.get("/reports", async (req, res) => {
  try {
    const details = await db.collection("reports").find().toArray();
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

app.post("/saveresult/:name/:date/:time/:type", async (req, res) => {
  try {
    const details = await db.collection("reports").insertOne({
      Name: req.params.name,
      Time: req.params.time,
      Date: req.params.date,
      SpeechType: req.params.type,
    });
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: "Failed to save result" });
  }
});

connectToDB(() => {
  app.listen(8000, () => {
    console.log("server Running At Port 8000");
  });
});