const Item = require('../models/Item');

// Create a new item
// controllers/itemController.js
// controllers/itemController.js

exports.createItem = async (req, res) => {
  const { title, description, price, category, image } = req.body;

  if (!title || !price) return res.status(400).json({ message: 'Title and price are required' });

  const newItem = await Item.create({
    title,
    description,
    price,
    category,
    image, // just store the link
    createdBy: req.user.id
  });

  res.status(201).json(newItem);
};





// Get all items with optional filters
exports.getItems = async (req, res) => {
  try {
    const query = {};
    const { category, minPrice, maxPrice } = req.query;

    if (category) query.category = category;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single item
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an item
// controllers/itemController.js
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if logged-in user is the creator
    if (item.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this product' });
    }

    Object.assign(item, req.body); // update fields
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete an item

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if logged-in user is the creator
    if (item.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await item.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
