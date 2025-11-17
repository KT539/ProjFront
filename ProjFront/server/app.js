import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoute.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({ origin: "http://localhost:5173" }));
app.use("/movies", movieRoutes);


app.get("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});


app.listen(PORT, () => {
  console.log(`OMDb proxy backend running on port ${PORT}`);
});
