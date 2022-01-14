const { Product } = require("../models");
const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../utils/consts");
const ErrorHandler = require("../utils/error-handler");
const ProductService = require("../services/product-service.js");

const create = async (req, res, next) => {
  try {
    const { name, description, category, price, image } = req.body;
    const { id } = req.user;

    await ProductService.create(name, description, category, image, price);
    res.json(CREATE_SUCCESS);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, category } = req.query;
    page = page || 1;
    limit = limit || 3;
    const offset = page * limit - limit;

    const products = await ProductService.getAll({
      offset,
      limit,
      q,
      category,
    });
    res.json(products);
  } catch (e) {
    res.status(404).json({ message: "Tag not found" });
  }
};
const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getOne(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "qwe not found" });
  }
};
const update = async (req, res, next) => {
  try {
    const { name, description, price, image, category } = req.body;

    const { id } = req.params;
    await ProductService.update(id, name, description, price, image, category);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductService.deleteOne(id);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
};
