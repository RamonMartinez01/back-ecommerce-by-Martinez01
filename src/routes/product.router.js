const { getAll, create, getOne, remove, update, getProductsByCategory, updateProductImage } = require('../controllers/product.controllers');
const express = require('express');
const upload = require('../utils/multer');

const productRouter = express.Router();

productRouter.route('/products')
    .get(getAll)
    .post(create)
    .get(getProductsByCategory)

productRouter.route('/updateimage/:id')
    .put(upload.single('imageUrl'), updateProductImage)

productRouter.route('/products/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

module.exports = productRouter;