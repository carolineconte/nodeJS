const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PhotoSchema = new Schema({
    name: { type: String, require: true },
    src: { type: String, require: true },
    description: { type: String },
    created_at: { type: String, require: true },
    modified_at: { type: String, require: true },
    hashtags: { type: String, require: true }
});

module.exports = mongoose.model("Photo", PhotoSchema);
