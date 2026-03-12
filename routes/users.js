const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../schemas/users');

// Create user
router.post('/', userController.create);

// Get all users
router.get('/', userController.getAll);

// Get user by ID
router.get('/:id', userController.getById);

// Update user
router.put('/:id', userController.update);

// Delete user (soft delete)
router.delete('/:id', userController.delete);

// Enable user
router.post('/enable', userController.enable);

// Disable user
router.post('/disable', userController.disable);

// Get all users by role ID
router.get('/role/:roleId', async (req, res, next) => {
  try {
    const { roleId } = req.params;

    const users = await User.find({
      role: roleId,
      isDeleted: false
    }).populate('role');

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this role"
      });
    }

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
