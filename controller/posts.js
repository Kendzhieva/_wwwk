import PostsModel from "../models/posts.js";


export const getAllPosts = async (req, res) => {
    try {
        let filter = {
            // isActivated: true
        }

        if (req.query.creatorId) {
            filter.creatorId = req.query.creatorId
        }

        let posts = await PostsModel.find(filter)

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить post`ы'
        })
    }
}

export const getAllPostsGroup = async (req, res) => {
    try {

        let posts = await PostsModel.find({ groupId: req.params.id })

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить post`ы group`ы'
        })
    }
}

export const getOnePost = async (req, res) => {
    try {

        const post = await PostsModel.findById(req.params.id)

        res.json(post)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить post'
        })
    }
}

export const addPost = async (req, res) => {
    try {

        const creatorId = req.userId
        const body = { ...req.body, creatorId }
        const post = await PostsModel(body)
        await post.save()

        res.json({
            message: "Вы записали post на профиль",
            status: "success"
        })

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const changeOnePost = async (req, res) => {
    try {

        const { _id, creatorId, ...other } = req.body

        const chancedPost = await PostsModel.findByIdAndUpdate(req.params.id, other,
            { returnDocument: "after" }
        )

        res.json(chancedPost)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось переписать post'
        })
    }
}

export const deletePost = async (req, res) => {
    try {

        const existingPost = await PostsModel.findByIdAndRemove(req.params.id)

        if (existingPost) {
            res.json({
                message: "Вы замазали post на профиля",
                status: "success"
            })
        }


    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const setLikePost = async (req, res) => {
    try {

        const post = await PostsModel.findById(req.params.id)

        const checkExistingLike = post.likes.some(item => item === req.body.userId)

        const chancedPost = await PostsModel.findByIdAndUpdate(req.params.id, {
            likes: checkExistingLike ? post.likes.filter(item => item !== req.body.userId) : [...post.likes, req.body.userId]
        }, { returnDocument: "after" })

        if (chancedPost) {
            res.json({
                message: "Вы любите этот post",
                status: "success"
            })
        }

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}