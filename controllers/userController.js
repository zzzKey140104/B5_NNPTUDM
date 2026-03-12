const createError = require('http-errors');
const User = require('../schemas/users');
const Role = require('../schemas/roles');

// Create new user
exports.create = async (req, res, next) => {
  try {
    const { username, password, email, fullName, role } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Username, password, and email are required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      isDeleted: false
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists"
      });
    }

    // Validate role if provided
    if (role) {
      const roleExists = await Role.findOne({ _id: role, isDeleted: false });
      if (!roleExists) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
    }

    const user = new User({
      username,
      password,
      email,
      fullName: fullName || "",
      role: role || null
    });

    await user.save();
    await user.populate('role');

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (exclude deleted)
exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false }).populate('role');

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, isDeleted: false }).populate('role');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, fullName, role } = req.body;

    const user = await User.findOne({ _id: id, isDeleted: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if username already exists
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username, isDeleted: false });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username already exists"
        });
      }
    }

    // Check if email already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, isDeleted: false });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    // Validate role if provided
    if (role) {
      const roleExists = await Role.findOne({ _id: role, isDeleted: false });
      if (!roleExists) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (fullName !== undefined) user.fullName = fullName;
    if (role !== undefined) user.role = role || null;

    await user.save();
    await user.populate('role');

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Soft delete user
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, isDeleted: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// Enable user (set status to true)
exports.enable = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: "Email and username are required"
      });
    }

    const user = await User.findOne({
      email,
      username,
      isDeleted: false
    }).populate('role');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.status) {
      return res.status(400).json({
        success: false,
        message: "User is already enabled"
      });
    }

    user.status = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User enabled successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Disable user (set status to false)
exports.disable = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: "Email and username are required"
      });
    }

    const user = await User.findOne({
      email,
      username,
      isDeleted: false
    }).populate('role');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.status) {
      return res.status(400).json({
        success: false,
        message: "User is already disabled"
      });
    }

    user.status = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User disabled successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};
