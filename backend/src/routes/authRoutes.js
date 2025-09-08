// src/routes/authRoutes.js
const router = require('express').Router();
const { signup, login, me, logout} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.post('/logout',  authMiddleware, logout);

module.exports = router;
