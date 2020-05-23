/* eslint-disable no-underscore-dangle */
const serviceProperty = require('./service');
const { success } = require('../../routes/response');

/**
 * Response a list of properties
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  const filters = req.query;
  try {
    const properties = await serviceProperty.findAll(filters);
    success(res, 'properties listed', properties, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a new property created
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const create = async (req, res, next) => {
  const userId = req.user._doc._id;
  const property = req.body;
  try {
    const createdProperty = await serviceProperty.insert(userId, property);
    success(res, 'property created', createdProperty, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a property
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const show = async (req, res, next) => {
  const propertyId = req.params.id;
  try {
    const property = await serviceProperty.findById(propertyId);
    success(res, 'property retrieved', property, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a updated property
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const update = async (req, res, next) => {
  const { _id: offererId } = req.user._doc._id;
  const property = req.body;
  const propertyId = req.params.id;
  try {
    const updatedProperty = await serviceProperty.update(propertyId, property, offererId);
    success(res, 'property updated', updatedProperty, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a partially deleted property
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const destroy = async (req, res, next) => {
  const { _id: offererId } = req.user._doc;
  const propertyId = req.params.id;
  try {
    const deletedProperty = await serviceProperty.destroy(propertyId, offererId);
    success(res, 'property deleted', deletedProperty, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Response with a property approved
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const approve = async (req, res, next) => {
  const propertyId = req.params.id;
  const { profileType } = req.user._doc;
  try {
    const approvedProperty = await serviceProperty.approve(propertyId, profileType);
    success(res, 'property approved', approvedProperty, 200);
  } catch (error) {
    next(error);
  }
};

const unapproved = async (req, res, next) => {
  const filters = req.query;
  const { profileType } = req.user._doc;
  try {
    const properties = await serviceProperty.findUnapproveProperties(filters, profileType);
    success(res, 'unapproved properties', properties, 200);
  } catch (error) {
    next(error);
  }
};

const myProperties = async (req, res, next) => {
  const { _id: offererId } = req.user._doc;
  const { query } = req;
  try {
    const properties = await serviceProperty.findMyProperties(offererId, query);
    success(res, 'properties listed', properties, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  approve,
  unapproved,
  myProperties,
};
