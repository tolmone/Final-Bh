// Import mongoose
const mongoose = require('mongoose');

// Schema
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: false,
        },
        categories: {
            type: Array,
            required: true,
        },
        uploadedDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);

// Model
const ProductModel = mongoose.model('products', ProductSchema);

// Export the model
module.exports = ProductModel;
