import express from "express";
import dotenv from "dotenv";
import { AgentsRoute } from "./3-routes/agentsRoute";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/agents", AgentsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
