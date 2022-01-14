const { password } = require("pg/lib/defaults");
const { DataTypes } = require("sequelize");
const sequelize = require("./../db.js");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  category: {
    type: DataTypes.ENUM(["Завтрак", "Обед", "Ужин", "Кофе"]),
  },
  price: { type: DataTypes.INTEGER },
  image: { type: DataTypes.STRING },
});

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  owner: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
});

const Like = sequelize.define("like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.BOOLEAN, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Product.hasMany(Like);
Like.belongsTo(Product);

Product.hasMany(Rating);
Rating.belongsTo(Product);

module.exports = {
  User,
  Product,
  Like,
  Comment,
  Rating,
};
