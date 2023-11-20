const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, require: true },
    photos: { type: String, require: true },
    created_at: { type: String, require: true },
    modified_at: { type: String, require: true },
    hashtags: { type: String, require: true }
});

module.exports = mongoose.model("Photo", PhotoSchema);