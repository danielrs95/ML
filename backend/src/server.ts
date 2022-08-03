import express from "express";

const app = express();

app.use(express.json());

const PORT = 5000;

app.get("/api/items", async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const meliResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    );
    const responseJson = await meliResponse.json();
    res.json(responseJson);
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
