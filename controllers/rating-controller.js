const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../utils/consts");
const RatingService = require("../services/rating-service");

const create = async (req, res, next) => {
  try {
    const { rate, productId, userId } = req.body;
    const { id } = req.user;
    await RatingService.create(rate, productId, id);
    res.json(CREATE_SUCCESS);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ratings = await RatingService.getAll(id);
    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { rate } = req.body;

    const { id } = req.params;
    await RatingService.update(id, rate);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    await RatingService.deleteOne(id);
    res.json({ message: DELETE_SUCCESS });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rating = await RatingService.getOne(id);
    res.json(rating);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  create,
  getAll,
  update,
  deleteOne,
  getOne,
};
