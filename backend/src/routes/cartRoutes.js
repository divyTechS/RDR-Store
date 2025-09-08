const router = require('express').Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
    updateQuantity
} = require('../controllers/cartController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);
router.post('/update', updateQuantity);

module.exports = router;
