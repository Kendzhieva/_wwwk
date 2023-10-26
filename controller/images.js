import ImagesModel from "../models/images.js";


export const getAllImages = async (req, res) => {
    try {
        let filter = {
            // isActivated: true
        }

        if (req.query.creatorId) {
            filter.creatorId = req.query.creatorId
        }

        let image = await ImagesModel.find(filter)

        res.json(image)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить image'
        })
    }
}

export const addImage = async (req, res) => {
    try {

        const creatorId = req.userId
        const body = { ...req.body, creatorId }

        const image = await ImagesModel(body)
        await image.save()

        res.json({
            message: "Вы повесили картину на профиль",
            status: "success"
        })

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const deleteImages = async (req, res) => {
    try {

        const existingImage = await ImagesModel.findByIdAndRemove(req.params.id)

        if (existingImage) {
            res.json({
                message: "Вы снесли картину с профиля",
                status: "success"
            })
        }


    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const setLikeImage = async (req, res) => {
    try {
        const image = await ImagesModel.findById(req.params.id)

        const checkExistingLike = image.likes.some(item => item === req.body.userId)

        const chancedImage = await ImagesModel.findByIdAndUpdate(req.params.id, {
            likes: checkExistingLike ? image.likes.filter(item => item !== req.body.userId) : [...image.likes, req.body.userId]
        }, { returnDocument: "after" })

        if (chancedImage) {
            res.json({
                message: "Вы любите картинку",
                status: "success"
            })
        }

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}