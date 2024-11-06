const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true
    },
    discount: {
        type: Number,
        required: [true, 'Discount value is required'],
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    type: {
        type: String,
        enum: ['general', 'user', 'workshop', 'product'],
        required: [true, 'Coupon type is required']
    },
    valid: {
        type: Boolean,
        required: [true, 'Coupon validity status is required'],
        default: true
    },
    expirationDate: {
        type: Date,
        required: [true, 'Expiration date is required']
    }
}, {
    collection: 'coupon'
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
