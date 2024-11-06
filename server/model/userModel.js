const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
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
        required: [true, 'Address is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    userType: {
        type: String,
        enum: ['buyer', 'artisan'],
        required: [true, 'User type is required']
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }, {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    }],
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    enrolledWorkshops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop' 
    }],
    coupons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    }]
}, {
    collection: 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
