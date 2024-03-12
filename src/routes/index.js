const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const productCartRouter = require('./productCart.router');
const purchaseRouer = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter)
router.use(categoryRouter)
router.use(productRouter)
router.use(imageRouter)
router.use(productCartRouter)
router.use(purchaseRouer)


module.exports = router;