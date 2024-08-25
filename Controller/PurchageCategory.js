// controllers/categoryController.js
const Category = require('../Models/Purchage/PurchaseCategory'); // Adjust the path as needed

// Create a new category
const createCategory = async (req, res) => {
    try {
        let { status, supplier } = req.body;
        let newCategory = await Category.create({
            status,
            supplier
        });
        return res.status(200).json({ success: true, message: "Category created successfully", newCategory });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        let result = await Category.findByIdAndDelete(req.params._id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.status(200).json({ success: true, message: "Categories retrieved successfully", categories });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    let { status, supplier } = req.body;
    let _id = req.params._id;
    try {
        let updatedCategory = await Category.findByIdAndUpdate(
            _id,
            { $set: { status, supplier } },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Category updated successfully", updatedCategory });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory
};
