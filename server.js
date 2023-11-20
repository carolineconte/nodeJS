const express = require("express");
const app = express();

app.use(express.json())

//CONNECTION
require("dotenv").config();
require("./src/connect.js");

//MODELS
const photo = require("./src/models/Photo.js");
const Album = require("./src/models/Album.js")

//controller
const { getAllAlbuns, newAlbum, deleteAlbum, attAlbum } = require('./src/controllers.js')

//UPLOAD LOCAL
const upload = require("./src/config/multer.js")


app.get('/collection', getAllAlbuns);
app.post('/collection', newAlbum);
app.put('/collection/album/:id', attAlbum);
app.delete('/collection/album/:id', deleteAlbum);


app.post('/collection/album/:id', upload.single("file"), async (req, res) => {
    try {
        const { name, description, hashtags, title } = req.body
        const dateUTC = new Date(Date.now()).toUTCString();
        const file = req.file

        // Carregar o álbum do banco de dados
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        const img = new photo({
            name,
            title,
            src: file.path,
            description,
            created_at: dateUTC,
            modified_at: dateUTC,
            hashtags
        })

        // Adicionar a imagem ao álbum
        album.imgs.push(img);
        
        await album.save();

        res.json({ img: img, msg: "image save!" })

    } catch (e) {
        res.status(500).json({ message: `${e.message}` })
    }
})






const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listen: http://localhost:${PORT}`);
})