const { check, validationResult } = require('express-validator');

const validateRegistration = [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('email').trim().isEmail().withMessage('Invalid email address'),
    check('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLogin = [
    check('email').trim().isEmail().withMessage('Invalid email address'),
    check('password').trim().notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateProductData = [
  check('name').trim().notEmpty().withMessage('Product name is required'),
  check('description').trim().notEmpty().withMessage('Description is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    check('artisanId').trim().notEmpty().withMessage('Artisan id is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



module.exports = { validateRegistration, validateLogin, validateProductData };
