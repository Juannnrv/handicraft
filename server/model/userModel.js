const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    },
    address: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    userType: {
        type: String,
        enum: ['buyer', 'artisan'],
        required: [true, 'User type is required']
    },
    favorites: [{
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        workshops: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workshop'
        }]
    }],
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    }],
    enrolledWorkshops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop',
        default: null
    }],
    coupons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        default: null
    }]
}, {
    collection: 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
