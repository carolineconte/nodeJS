
const Album = require("./models/Album.js")

const getAllAlbuns = async (req, res) => {
    try {
        const getAll = await Album.find({});
        res.status(200).json(getAll);
    } catch (error) {
        res.status(500).json({ message: `${error.message} - error` });
    }
}

const newAlbum = async (req, res) => {
    try {
        const { name, hashtags } = req.body

        const dateUTC = new Date(Date.now()).toUTCString();

        console.log(name)

        const newAlbum = new Album({
            name,
            created_at: dateUTC,
            modified_at: dateUTC,
            hashtags
        });

        await newAlbum.save(); // Salvar o álbum no banco de dados

        res.json({ newAlbum, msg: "Album created!" })

    } catch (e) {
        res.status(500).json({ message: `erro ${e}` })
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const id = req.params.id;
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "album deleted successfully" });
    } catch (error) {
        console.log(error)
    }
}

const attAlbum = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, hashtags } = req.body

        const dateUTC = new Date(Date.now()).toUTCString();

        const albumAtt = new albuns({
            name: name,
            modified_at: dateUTC,
            hashtags: hashtags
        });

        await Album.findByIdAndUpdate(id, albumAtt);
        res.status(200).json({ message: "album att successfully" });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllAlbuns,
    newAlbum,
    deleteAlbum,
    attAlbum
}