import express from 'express'

const app = express()

app.use(express.json())

const PORT = 5000;

app.get('/', async (_req, res) => {
  try {
    const meliResponse = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=carmex')
    const responseJson = await meliResponse.json()
    res.json(responseJson)
  } catch (error) {
    throw error
  }
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})