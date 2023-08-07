const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const ProductImg = require('./ProductImg');
const Purchase = require('./Purchase');
const User = require('./User');

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);
// Product tiene muchos carritos
// producto en el carrito splo hace referencia a un producto(un carrito solo tiene un producto)

User.hasMany(Cart);
Cart.belongsTo(User);
// Un usuario puede tener muchos carritos
// Un carrito tiene solo un usuario

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);
