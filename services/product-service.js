const { Op } = require("sequelize");
const { Product } = require("./../models");
const ErrorHandler = require("./../utils/error-handler.js");

const create = async (name, description, category, image, price) => {
  const product = await Product.create({
    name,
    description,
    category,
    image,
    price,
  });

  return product;
};

const getAll = async ({ offset, limit, q, category }) => {
  if (q || category) {
    q = q || "";
    if (category) {
      console.log(category);
      return await Product.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
          category,
        },

        limit,
        offset,
      });
    } else {
      return await Product.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
        },

        limit,
        offset,
      });
    }
  }

  return await Product.findAndCountAll({
    limit,
    offset,
  });
};

const deleteOne = async (id) => {
  return await Product.destroy({ where: { id } });
};
const update = async (id, name, description, price, image, category) => {
  return await Product.update(
    { name, description, price, image, category },
    { where: { id } }
  );
  //   return await Product.patch({ where: { id } });
};
const getOne = async (id) => {
  const product = await Product.findOne({
    where: { id },
  });
  console.log(product);
  return product.dataValues;
};
module.exports = {
  create,
  getAll,
  deleteOne,
  update,
  getOne,
};
