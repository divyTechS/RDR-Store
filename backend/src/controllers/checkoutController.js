const Cart = require('../models/Cart');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    // Simulate payment success
    const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    // Clear cart after successful checkout
    cart.items = [];
    await cart.save();

    res.json({ message: 'Payment successful', total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
