const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Create role
router.post('/', roleController.create);

// Get all roles
router.get('/', roleController.getAll);

// Get role by ID
router.get('/:id', roleController.getById);

// Update role
router.put('/:id', roleController.update);

// Delete role (soft delete)
router.delete('/:id', roleController.delete);

module.exports = router;
