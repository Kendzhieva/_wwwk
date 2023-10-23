import PostCommentsModel from '../models/postComments.js'


export const getAllPostComments = async (req, res) => {
    try {
        let filter = {
            // isActivated: true
        }

        if (req.query.postId) {
            filter.postId = req.query.postId
        }

        let comments = await PostCommentsModel.find(filter)

        res.json(comments)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить comment`ы post'
        })
    }
}

export const getOnePostComment = async (req, res) => {
    try {

        const postComment = await PostCommentsModel.find(req.params.id)

        res.json(postComment)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить comment'
        })
    }
}

export const addPostComment = async (req, res) => {
    try {

        // const creatorId = req.userId
        // const body = { ...req.body, creatorId }
        const comment = await PostCommentsModel(req.body)
        await comment.save()

        res.json(comment)

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const changePostComment = async (req, res) => {
    try {

        const { _id, creatorId, postId, ...other } = req.body

        const chancedPostComment = await PostCommentsModel.findByIdAndUpdate(req.params.id, other,
            { returnDocument: "after" }
        )

        res.json(chancedPostComment)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось переписать comment post`a'
        })
    }
}

export const deletePostComment = async (req, res) => {
    try {

        const existingPostComment = await PostCommentsModel.findByIdAndRemove(req.params.id)

        if (existingPostComment) {
            res.json({
                message: "Вы замазали comment на post",
                status: "success"
            })
        }


    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const setLikePostComment = async (req, res) => {
    try {
        const postComment = await PostCommentsModel.findById(req.params.id)

        const checkExistingLike = postComment.likes.some(item => item === req.body.userId)

        const chancedPostComment = await PostCommentsModel.findByIdAndUpdate(req.params.id, {
            likes: checkExistingLike ? changePostComment.likes.filter(item => item !== req.body.userId) : [...postComment.likes, req.body.userId]
        }, { returnDocument: "after" })

        if (chancedPostComment) {
            res.json({
                message: "Вы любите этот comment",
                status: "success"
            })
        }

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}