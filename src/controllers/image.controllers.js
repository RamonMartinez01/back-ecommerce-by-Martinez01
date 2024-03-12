const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const file = req.file;
    const { productId } = req.body;
    const { url } = await uploadToCloudinary(file);
    const image = await Image.create({
        url,
        productId
    });
    return res.status(201).json(image);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Image.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    await deleteFromCloudinary(image.url);
    await image.destroy();
    return res.sendStatus(204);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove
    
}