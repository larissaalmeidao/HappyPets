import express from 'express'
import upload from '../config/uploadconfig.js'
import {
    uploadImage,
    getImages,
    updateImage,
    deleteImage
} from '../script/image.js'

const router = express.Router()

router.post('/images', upload.single('image'), uploadImage)
router.get('/images', getImages)
router.put('/images/:id', upload.single('image'), updateImage)
router.delete('/images/:id', deleteImage)

export default router