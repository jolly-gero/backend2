const express = require('express')
const app = express()
const jollymain = require('./model/name')
const mongoose = require('mongoose')


mongoose.connect('mongodb://admin:secure@203.150.221.212:2277/jolly?authSource=admin', {
  useNewUrlParser: true
})

mongoose.connection.on("connected", function() {
  console.log("connected");
});

app.use(express.json())

products = {}

app.get('/', (req, res) => {
    res.json({data : 'ok'})
})

app.get('/pro', async (req, res) => {
  products = await jolly.findOne({_id: "5f86cedead32f233b19856a5"})
  res.json(products)
})

app.listen(5000 , () => {
    console.log('server start on port 5000');
})