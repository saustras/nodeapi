const {Router} = require('express');
const { check } = require('express-validator');

const { clientExistsForId, productExists} = require('../helpers/dbValidators');
const { validFields } = require('../middleware/valid-fields');
const { productGet, productGetSpecialPrice } = require('../controllers/product.controllers');

const router = Router()

router.get('/products', validFields, productGet);

router.get('/price/:id/:product',[
    check('id').custom(clientExistsForId),
    check('product').custom(productExists),
    validFields
], productGetSpecialPrice);


module.exports= router;