import express from "express";

const app = express();

app.use(express.json());

const PORT = 5000;

// Helper to get decimals from price
const getDecimals = (price: number) => {
  const array = price.toString().split(".");
  if (array.length > 1) return array[1].length;
  return 0;
};

app.get("/api/items", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    );
    const responseJson = await response.json();

    const items = responseJson.results.slice(0, 4).map((result: any) => ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price,
        decimals: getDecimals(result.price),
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
    }));

    const categories = responseJson.results.slice(0, 4).map((result: any) => result.category_id);

    const data = {
      author: {
        name: "Daniel",
        lastname: "Ramirez Salazar",
      },
      categories,
      items,
    };

    res.json(data);
  } catch (error) {
    res.status(500).send("ERROR");
    throw error;
  }
});

app.get("/api/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const responseJson = await response.json();

    const description = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
    const descriptionJson = await description.json();

    const data = {
      author: {
        name: "Daniel",
        lastname: "Ramirez Salazar",
      },
      item: {
        id: responseJson.id,
        title: responseJson.title,
        price: {
          currency: responseJson.currency_id,
          amount: responseJson.price,
          decimals: getDecimals(responseJson.price),
        },
        picture: responseJson.thumbnail,
        condition: responseJson.condition,
        free_shipping: responseJson.shipping.free_shipping,
        sold_quantity: responseJson.sold_quantity,
        description: descriptionJson.plain_text,
      },
    };

    res.json(data);
  } catch (error) {
    res.status(500).send("ERROR");
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
