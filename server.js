const express = require("express");
const app = express();

app.use(express.json())

//CONNECTION
require("dotenv").config();
require("./src/connect.js");

//controller
const { getAllAlbuns, newAlbum, deleteAlbum, attAlbum } = require('./src/controllersAlbum.js')
const { newImage,getAllImages,getOneImageByID,deleteIMG,attPHOTO } = require('./src/controllersImg.js')

//MIDDLEWARE
const { errorControlAlbum } = require('./src/middleware.js')

//UPLOAD LOCAL
const upload = require("./src/config/multer.js")


app.get('/collection', getAllAlbuns);
app.post('/collection', errorControlAlbum, newAlbum);
app.put('/collection/album/:id', errorControlAlbum, attAlbum);
app.delete('/collection/album/:id', deleteAlbum);


app.get('/collection/album/:id', getAllImages)
app.post('/collection/album/:id', upload.single("file"), newImage)
app.get('/collection/album/:id/photo/:idIMG', getOneImageByID)
app.delete('/collection/album/:id/photo/:idIMG', deleteIMG)
app.put('/collection/album/:id/photo/:idIMG', attPHOTO)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listen: http://localhost:${PORT}`);
})