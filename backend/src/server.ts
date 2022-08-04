import express from "express";
import itemRouter from "../routes/itemsRoutes"

const app = express();

app.use(express.json());

const PORT = 5000;

app.use("/api", itemRouter );

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
