import express from "express";
import dotenv from "dotenv";
import { AgentsRoute } from "./3-routes/agentsRoute";
import { AuthRoute } from "./3-routes/auth";
import { verifyToken } from "./middleware/jwt";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRoute);
app.use("/api/agents", verifyToken, AgentsRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
