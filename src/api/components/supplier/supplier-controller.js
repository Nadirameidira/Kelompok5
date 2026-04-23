const supplierService = require('./supplier-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getSupplier(request, response, next) {
  try {
    const supplier = await supplierService.getSupplier();

    return response.status(200).json(supplier);
  } catch (error) {
    return next(error);
  }
}

async function createSupplier(request, response, next) {
  try {
    const { name, contactPerson, phone, email, address } = request.body;

    if (!name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name isnt valid');
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email isnt valid');
    }

    if (!phone) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Phone isnt valid');
    }

    if (await supplierService.supplierNameDone(name)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Supplier name already registered.'
      );
    }

    if (await supplierService.supplierEmailDone(email)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Supplier email already registered.'
      );
    }

    const supplier = await supplierService.createSupplier({
      name,
      contactPerson,
      phone,
      email,
      address,
    });

    return response.status(201).json(supplier);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSupplier,
  createSupplier,
};
