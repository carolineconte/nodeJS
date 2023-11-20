const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, require: true },
    imgs: {type: Array},
    created_at: { type: String, require: true },
    modified_at: { type: String, require: true },
    hashtags: { type: Array, require: true }
});

module.exports = mongoose.model("Album", AlbumSchema);