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

    } catch (error) {
        res.status(500).json({ message: `${error.message} - error` })
    }
}

const getAllImages = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        res.status(200).json(album.imgs);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - error` });
    }
}

const getOneImageByID = async (req, res) => {
    try {

        const album = await Album.findById(req.params.id);

        const imgSelected = album.imgs.find(img => img._id == req.params.idIMG);

        if (!imgSelected) {
            return res.status(404).json({ message: "Image not found in the album" });
        }

        res.status(200).json(imgSelected);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - error` });
    }
}

const deleteIMG = async (req, res) => {
    try {

        const album = await Album.findById(req.params.id);

        const imgs = album.imgs
        imgs.map(img => {
            if (img._id !== req.params.idIMG) {
                return img
            }
        });

        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(500).json({ message: `${error.message} - Error request` });
    }
}

const attPHOTO = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        const { name, description, hashtags, title } = req.body
        const dateUTC = new Date(Date.now()).toUTCString();

        const imgToUpdate = album.imgs.find(img => img._id == req.params.idIMG);
        const test = req.params.idIMG
        console.log(test,name, description, hashtags, title)

        imgToUpdate.name = name;
        imgToUpdate.title = title;
        imgToUpdate.description = description;
        imgToUpdate.modified_at = dateUTC;
        imgToUpdate.hashtags = hashtags;

        await album.save();

        res.status(200).json({ message: "Img att successfully" });

    } catch (error) {
        console.log({ message: `${error.message} - Error request` })
    }
}

module.exports = {
    newImage,
    getAllImages,
    getOneImageByID,
    deleteIMG,
    attPHOTO
}