//CHAMAR O PACOTE
const multer = require("multer");
//FACILITAR OS CAMINHOS DO ARQUIVO
const path = require("path")
//config para salvar as imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

module.exports = upload

//destination onde sera salvo
//filename como sera o nome no servidor