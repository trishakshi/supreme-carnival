const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    status: { type: String, required: true },
    passwordHash: { type: String },
    roleId: { type: String }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User;