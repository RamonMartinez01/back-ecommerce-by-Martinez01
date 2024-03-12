const { getAll, create, getOne, remove, update } = require('../controllers/productCart.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const productCartRouter = express.Router();

productCartRouter.route('/productscart')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

productCartRouter.route('/productscart/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = productCartRouter;