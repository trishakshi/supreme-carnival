const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    image: { type: String },
    title: { type: String },
    description: { type: String },
    hashTag: { type: String },
    uploadedBy: {type: Schema.Types.ObjectId}
}, {
    timestamps: true
})

const personalizedSchema = new Schema({
    image: {type: String},
    userId: {type: Schema.Types.ObjectId}
}, {
    timestamps: true
})

const Media = mongoose.model('media', mediaSchema);
const Personalized = mongoose.model('personalized', personalizedSchema)

module.exports = {
    Media: Media,
    Personalized: Personalized
}