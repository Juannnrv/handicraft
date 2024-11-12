const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profilePicture: {
        data: {
          type: Buffer,
          default: null
        },
        contentType: {
          type: String,
          default: 'image/png'
        },
        url: {
          type: String,
          default: 'https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg'
        }
      },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    },
    userType: {
        type: String,
        enum: ['comprador', 'artesano'],
        default: 'comprador',
        required: [true, 'User type is required']
    },
    gender: {
        type: String,
        enum: ['hombre', 'mujer'],
        required: [true, 'User Gender is required']
    },
    birthday: {
        type: Date,
        required: [true, 'Birthday is required'],
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
