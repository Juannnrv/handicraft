const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: 'https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg'
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
        sparse: true,
        default: null
    },
    userType: {
        type: String,
        enum: ['comprador', 'artesano'],
        default: 'comprador',
    },
    gender: {
        type: String,
        enum: ['hombre', 'mujer', 'na'],
    },
    birthday: {
        type: Date,
    },
    googleId: { type: String, unique: true, sparse: true },
    discordId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    favorites: {
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        workshops: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workshop'
        }]
    },
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    }],
    workshopsEnrolled: [{
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
    collection: 'user',
    timestamps: true,
});

// Generate random phone number
const generateRandomPhoneNumber = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

// Middleware to set phone number for Discord users
userSchema.pre('save', function(next) {
    if (this.discordId) {
        this.phone = generateRandomPhoneNumber();
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;