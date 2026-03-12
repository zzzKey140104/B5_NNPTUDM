const createError = require('http-errors');
const Role = require('../schemas/roles');

// Create new role
exports.create = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required"
      });
    }

    const existingRole = await Role.findOne({ name, isDeleted: false });
    if (existingRole) {
      return res.status(409).json({
        success: false,
        message: "Role name already exists"
      });
    }

    const role = new Role({
      name,
      description: description || ""
    });

    await role.save();

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role
    });
  } catch (error) {
    next(error);
  }
};

// Get all roles (exclude deleted)
exports.getAll = async (req, res, next) => {
  try {
    const roles = await Role.find({ isDeleted: false });

    res.status(200).json({
      success: true,
      message: "Roles retrieved successfully",
      data: roles
    });
  } catch (error) {
    next(error);
  }
};

// Get role by ID
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ _id: id, isDeleted: false });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Role retrieved successfully",
      data: role
    });
  } catch (error) {
    next(error);
  }
};

// Update role
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await Role.findOne({ _id: id, isDeleted: false });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    // Check if new name already exists
    if (name && name !== role.name) {
      const existingRole = await Role.findOne({ name, isDeleted: false });
      if (existingRole) {
        return res.status(409).json({
          success: false,
          message: "Role name already exists"
        });
      }
    }

    if (name) role.name = name;
    if (description !== undefined) role.description = description;

    await role.save();

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role
    });
  } catch (error) {
    next(error);
  }
};

// Soft delete role
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ _id: id, isDeleted: false });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    role.isDeleted = true;
    await role.save();

    res.status(200).json({
      success: true,
      message: "Role deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
