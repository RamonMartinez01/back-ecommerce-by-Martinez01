const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Image = require('../models/Image')
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await Product.findAll({ include: [ Category, Image ] });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, { include: [ Category, Image ] });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

//Original function remove
/*const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});*/

//second funtion remove
const remove = catchError(async (req, res) => {
    const { id } = req.params;

    // Retrieve the product data using the provided ID
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    // Extract the imageUrl from the product data
    const { imageUrl } = product;

    // Check if the product has an imageUrl
    if (imageUrl) {
        try {
            // Use the Cloudinary API to delete the image associated with the imageUrl
            await deleteFromCloudinary(imageUrl);
        } catch (error) {
            // Handle any errors that occur during the image deletion process
            console.error("Error deleting image from Cloudinary:", error);
            return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
        }
    }

    // Remove the product from the database
    await Product.destroy({ where: { id } });

    // Return a success message indicating that the product has been removed
    return res.status(204).send();
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

//Esta función debería filtrar los productos por categoría por medio de query params en postman
//Sin embargo por ahora no funciona. 
const getProductsByCategory = catchError(async(req, res) => {
    const where = {};
    const {categoryId} = req.query;

    if (categoryId)
    where.categoryId = categoryId
    const products = await Product.findAll({
        where: { categoryId },
        include: [ Category ]
    });
    return res.json(products);
});

//ésta función actualiza el campo "imageUrl" del modelo User, del body, no recibe json, solo form-data 
const updateProductImage = catchError(async (req, res) => {
    const { id } = req.params;
    let imageUrl;

    // Verificar si hay un archivo adjunto
    if (!req.file) {
        return res.status(400).json({ error: "Debe proporcionar una imagen para actualizar" });
    }

    // Cargar la nueva imagen a Cloudinary
    const { url } = await uploadToCloudinary(req.file);
    imageUrl = url;

    // Actualizar solo la imagen del producto en la base de datos
    const updatedProduct = await Product.update(
        { imageUrl },
        { where: { id }, returning: true }
    );

    if (updatedProduct[0] === 0) return res.sendStatus(404);
    return res.json(updatedProduct[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    getProductsByCategory,
    updateProductImage
}