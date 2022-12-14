import express from 'express';

const router = express.Router();

// * Helper to get decimals from price
export const getDecimals = (price: number) => {
  const array = price.toString().split(".");
  if (array.length > 1) return array[1].length;
  return 0;
};

router.get('/items', async (req, res) => {
  const { q } = req.query;

  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    );
    const responseJson = await response.json();

    // * Iterate over the categories, string of arrays to get the 4 responses
    const itemID = responseJson.results.slice(0, 4).map((result: any) => result.id);
    const imagesUrl = await Promise.all(itemID.map(async (id: any) => {
      const resp = await fetch(`https://api.mercadolibre.com/items/${id}`)
      const respJson =  await resp.json()
      return  respJson.pictures[0].url
    }))

    const items = responseJson.results.slice(0, 4).map((result: any, index: any) => ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price,
        decimals: getDecimals(result.price),
      },
      picture: imagesUrl[index],
      condition: result.condition,
      address: `${result.address.state_name} - ${result.address.city_name}`,
      free_shipping: result.shipping.free_shipping,
    }));

    const categoriesID = responseJson.results.slice(0, 4).map((result: any) => result.category_id);

    // * Iterate over the categories, string of arrays to get the 4 responses
    const categories = await Promise.all(categoriesID.map(async (category: any) => {
      const resp = await fetch(`https://api.mercadolibre.com/categories/${category}`)
      const respJson =  await resp.json()
      return  respJson.path_from_root
    }))

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
} )

router.get('/items/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const responseJson = await response.json();

    const description = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
    const descriptionJson = await description.json();

    const category = await fetch(`https://api.mercadolibre.com/categories/${responseJson.category_id}`)
    const categoryJson = await category.json()
    const categoryResponse = categoryJson.path_from_root

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
        picture: responseJson.pictures[0].url,
        condition: responseJson.condition,
        free_shipping: responseJson.shipping.free_shipping,
        sold_quantity: responseJson.sold_quantity,
        description: descriptionJson.plain_text,
        categoryResponse,
      },
    };

    res.json(data);
  } catch (error) {
    res.status(500).send("ERROR");
    throw error;
  }
} )

export default router