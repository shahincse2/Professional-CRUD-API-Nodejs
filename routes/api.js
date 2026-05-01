const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

// ইনপুট ভ্যালিডেশন রুলস
const validateProduct = [
    body('ProductName').notEmpty().withMessage('Name is required').trim(),
    body('ProductCode').notEmpty().withMessage('Code is required'),
    body('Qty').isNumeric().custom(val => val > 0).withMessage('Qty must be a number > 0'),
    body('UnitPrice').isNumeric().custom(val => val > 0).withMessage('Price must be a number > 0'),
    body('Img').isURL().withMessage('Valid image URL is required')
];

// ১. Read (All & Single)
router.get('/ReadProduct', productController.readProduct);
router.get('/ReadProduct/:id', productController.readProductByID);

// ২. Search
router.get('/SearchProduct', productController.searchProduct);

// ৩. Create & Update (With Validation)
router.post('/CreateProduct', validateProduct, productController.createProduct);
router.post('/UpdateProduct/:id', validateProduct, productController.updateProduct);

// ৪. Delete
router.get('/DeleteProduct/:id', productController.deleteProduct);

module.exports = router;