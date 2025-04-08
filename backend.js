const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb+srv://root:root@shopify.hlflnso.mongodb.net/products');
const Product = mongoose.model('Product', new mongoose.Schema({
    id: Number,
    category: String,
    title: String,
    heading: String,
    description: [String],
    price: String,
    images: [String],
    thumbnail: String
  }));

const app = express();

app.use(express.json());
app.use(cors());


app.post('/products', (req, res) =>
  Product.create(req.body).then(data => res.json(data))
);

app.get('/products', (req, res) =>
  Product.find().then(data => res.json(data))
);

app.get('/products/:id', (req, res) =>
  Product.findById(req.params.id).then(data => res.json(data))
);

app.put('/products/:id', (req, res) =>
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(data => res.json(data))
);

app.delete('/products/:id', (req, res) =>
  Product.findByIdAndDelete(req.params.id).then(() => res.json({ message: 'Product deleted' }))
);

app.listen(3000, () => console.log('Server running on port 3000'));
