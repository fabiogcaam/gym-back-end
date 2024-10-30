const router = require('express').Router()

const uploader = require('./../middlewares/upload.middleware')

router.post('/image', uploader.single('imageData'), (req, res, next) => {

    if (!req.file) {
        res.status(500).json('No se ha cargado el archivo')
        return
    }
    res.json({ cloudinary_url: req.file.path })
})

module.exports = router