const Category = require("./Category");
const Product = require("./Product");
const Image = require('./Image');
const ProductCart = require("./ProductCart");
const User = require("./User");
const Purchase = require("./Purchase");

Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product);
Product.hasMany(Image);

ProductCart.belongsTo(User);
User.hasMany(ProductCart);

Product.hasMany(ProductCart);
ProductCart.belongsTo(Product);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);
