const router = require('express').Router();
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
