const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { parseAstAsync } = require('vite');

// Esquema de usuario combinado
const userSchema = new mongoose.Schema({
    // Información básica de usuario
    username: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        unique: true,
        sparse: true, // Esto hace que la unicidad solo se aplique si el valor no es null
    },
    password: {
        type: String,
        // required: function() { return !this.googleId && !this.discordId && !this.facebookId; },  // Solo requerido si no es autenticación externa
    },
    profilePicture: {
        type: String,
        default: 'https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg'
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    },
    userType: {
        type: String,
        enum: ['comprador', 'artesano'],
        default: 'comprador',
        // required: [true, 'User type is required']
    },
    gender: {
        type: String,
        enum: ['hombre', 'mujer', 'na'],
        // required: [true, 'User Gender is required']
    },
    birthday: {
        type: Date,
        // required: [true, 'Birthday is required'],
    },

    // Información sobre proveedores de autenticación externa
    googleId: { type: String, unique: true, sparse: true },
    discordId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },

    // Relacionados con productos y talleres (compras, favoritos, etc.)
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
    timestamps: true,  // Para registrar la fecha de creación y actualización
});


const User = mongoose.model('User', userSchema);

module.exports = User;
