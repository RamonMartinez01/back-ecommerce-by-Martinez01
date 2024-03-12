const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [ Product ],
        where: { userId: req.user.id }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;

    // Obtener los productos en el carrito del usuario
    const productsInCart = await ProductCart.findAll({ where: { userId } });

    if (productsInCart.length === 0) {
        return res.status(400).json({ message: "No hay productos en el carrito para realizar la compra." });
    }

    // Crear una nueva compra
    const purchase = await Purchase.create({ userId });

    // Agregar cada producto del carrito a la compra
    for (const productCart of productsInCart) {
        const { productId, quantity } = productCart;
        // Agregar el producto a la compra con la cantidad correspondiente
        await purchase.addProduct(productId, { through: { quantity } });
    }

    // Vaciar el carrito después de la compra
    await ProductCart.destroy({ where: { userId } });

    return res.status(201).json(purchase);
});
/*const create = catchError(async(req, res) => {
    const result = await Purchase.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
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