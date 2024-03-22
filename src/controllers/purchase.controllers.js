const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');
const image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [ 
            {
                model: Product,
                include: image
                }
         ],
        where: { userId: req.user.id }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const productsCart = await ProductCart.findAll({
        where: { userId: req.user.id },
        attributes: [ 'quantity', 'userId', 'productId' ],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(productsCart);
    await ProductCart.destroy({ where: { userId: req.user.id }})
    return res.json(purchases);
});


/*const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Purchase.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});*/

module.exports = {
    getAll,
    create
   
}