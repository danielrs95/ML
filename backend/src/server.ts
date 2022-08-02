import express from 'express'

const app = express()

app.use(express.json())

const PORT = 5000;

app.get('/ping', (_req, res) => {
  console.log('test')
  res.send('PONG')
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})