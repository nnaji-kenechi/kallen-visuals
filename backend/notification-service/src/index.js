import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 4003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("Notification service running");
});

app.post("/notify", async (req, res) => {
try {
const { message } = req.body;

await fetch(process.env.NTFY_URL, {
  method: "POST",
  body: message
});

res.json({
  success: true,
  message: "Notification sent"
});

} catch (error) {
console.error(error);

res.status(500).json({
  success: false,
  error: error.message
});

}
});

app.listen(PORT, () => {
console.log(
"Notification service running on port ${PORT}"
);
});
