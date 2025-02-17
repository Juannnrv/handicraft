const mongoose = require('mongoose');


const workshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    modality: {
        type: String,
        enum: ['Presencial', 'Virtual'],
        required: [true, 'Modality is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    materialsProvided: {
        type: [String],
        required: [true, 'Materials provided are required']
    },
    materialsRequired: {
        type: [String],
        required: [true, 'Materials required are required']
    },
    documentary: {
        type: String,
        required: [true, 'Documentary URL is required']
    },
    artisanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Artisan ID is required']
    }
}, {
    collection: 'workshop'
});

// Crear índice de texto en los campos 'name' y 'description'
workshopSchema.index({ name: 'text', description: 'text' });

// Índices para mejorar el rendimiento de las consultas
workshopSchema.index({ modality: 1 }); // Crea un índice en el campo "modality"
workshopSchema.index({ location: 1 }); // Crea un índice en el campo "location"
const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
