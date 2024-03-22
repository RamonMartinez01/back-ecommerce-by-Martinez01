const { getAll, create } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const purchaseRouer = express.Router();

purchaseRouer.route('/purchases')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create)

module.exports = purchaseRouer;