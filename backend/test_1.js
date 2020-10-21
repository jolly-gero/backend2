const express = require('express')
const app = express()
// const Product = require('./model/table')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/jolly', {
  useNewUrlParser: true
})

app.use(express.json())

const products = [{}]

app.get('/', (req,res) => {
    res.json({data : 'ok'})
})

app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

app.post('/products', async (req, res) => {
  const payload = req.body
  const product = new Product(payload)
  await product.save()
  res.status(201).end()
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.json(product)
})

app.put('/products/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, { $set: payload })
  res.json(product)
})

app.listen(4000 , () => {
    console.log('server start on port 4000');
})