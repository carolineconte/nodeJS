function errorControlAlbum(req, res, next) {
    const { body } = req

    if (!body.name) {
        return res.status(400).json({ message: 'erro field name' })
    }

    if (!body.hashtags) {
        return res.status(400).json({ message: 'erro field name' })
    }
    next()
}

//TODO middleware upload img

module.exports = {
    errorControlAlbum,
    
}