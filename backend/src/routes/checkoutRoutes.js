const router = require('express').Router();
const { checkout } = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, checkout);

module.exports = router;
