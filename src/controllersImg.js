//MODELS
const photo = require("./models/Photo.js");
const Album = require("./models/Album.js")

const newImage = async (req, res) => {
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
        // Atulizar alteracao
        album.modified_at = dateUTC;
        console.log(album.modified_at)
        await album.save();

        res.json({ img: img, msg: "image save!" })

    } catch (e) {
        res.status(500).json({ message: `${e.message}` })
    }
}

const getAllImages = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        res.status(200).json(album.imgs);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Falha na requisicao` });
    }
}

const getOneImageByID = async (req, res) => {
    try {
        const imgSelected = await photo.findById(req.params.id);
        res.status(200).json(imgSelected);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Falha na requisicao` });
    }
}

module.exports = {
    newImage,
    getAllImages,
    getOneImageByID
}