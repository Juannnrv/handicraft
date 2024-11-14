const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    photos: [{
        type: String, // URLs for product images
        required: [true, 'At least one product photo is required']
    }],
    stock: {
        type: Number,
        required: [true, 'Product stock quantity is required'],
        min: [0, 'Stock cannot be less than 0']
    },
    artisanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Artisan ID is required']
    },
    discount:{
        type: Boolean,
        default: false
    },
    percentage:{
        type: Number,
        default: 0
    }
}, {
    collection: 'product'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
