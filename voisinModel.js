var mongoose = require('mongoose');
// Setup schema
var voisinSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    aboutMe: {
        type: String,
        required: false
    },
    favorie: [String],
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export voisin model
var voisin = module.exports = mongoose.model('voisin', voisinSchema);
module.exports.get = function (callback, limit) {
    voisin.find(callback).limit(limit);
}