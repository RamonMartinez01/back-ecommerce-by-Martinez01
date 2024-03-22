const { getAll, create, getOne, remove, update, getProductsByCategory, updateProductImage } = require('../controllers/product.controllers');
const express = require('express');
const upload = require('../utils/multer');

const productRouter = express.Router();

productRouter.route('/products')
    .get(getAll)
    .post(create)
    .get(getProductsByCategory)

    productRouter.route('/updateproductimage/:id')
    .put(
        upload.any('imageUrl', 'imageUrl2', 'imageUrl3', 'imageUrl4' ),
        updateProductImage
    )

productRouter.route('/products/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

module.exports = productRouter;