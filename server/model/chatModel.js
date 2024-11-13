const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender ID is required']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: [true, 'Message content is required'],
        maxlength: [500, 'Message content cannot exceed 500 characters']
    },
    date: {
        type: Date,
        required: [true, 'Message date is required'],
        default: Date.now
    }
}, {
    collection: 'chat'
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
