const express = require("express");
const app = express();

app.use(express.json())

//CONNECTION
require("dotenv").config();
require("./src/connect.js");

//MODELS
const photo = require("./src/models/Photo.js");

//UPLOAD LOCAL
const upload = require("./src/config/multer.js")

app.get('/', (req, res) => {
    res.json({ message: "funciona" })
})

app.post('/albuns/:id/collection', upload.single("file"), async (req, res) => {
    try {
        const { name, description, hashtags } = req.body
        const dateUTC = new Date(Date.now()).toUTCString();
        const file = req.file

        const img = new photo({
            name,
            src: file.path,
            description,
            created_at: dateUTC,
            modified_at: dateUTC,
            hashtags
        })

        await img.save()

        res.json({ img: img, msg: "image save!" })

    } catch (e) {
        res.status(500).json({ message: "erro" })
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listen: http://localhost:${PORT}`);
})