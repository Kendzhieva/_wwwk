import UsersModel from "../models/users.js";

export const getAllUser = async (req, res) => {
    try {
        let filter = {
            // isActivated: true
        }

        let users = await UsersModel.find(filter)

        users = users.map(({ avatar, name, surname, _id }) => {
            return { avatar, name, surname, _id }
        })

        res.json(users)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить users'
        })
    }
}


export const getOneUser = async (req, res) => {
    try {

        const user = await UsersModel.findById(req.params.id)

        const { passwordHash, ...other } = user

        res.json(other)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить user'
        })
    }
}


export const changeOneUser = async (req, res) => {
    try {

        const { email, isActivated, passwordHash, _id, avatar, images, ...other } = req.body

        const chancedUser = await UsersModel.findByIdAndUpdate(req.params.id, other, { returnDocument: "after" })

        const { passwordHash: _, ...userData } = chancedUser._doc

        res.json(userData)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось изменить user'
        })
    }
}


export const deleteOneUser = async (req, res) => {
    try {

        const existingUser = await UsersModel.findByIdAndRemove(req.params.id)

        if (existingUser) {
            res.json({
                status: 'success',
                message: "user больше не существует"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: 'user = undefined'
        })
    }
}


export const changeAvatarUrl = async (req, res) => {
    try {

        const reqUserId = req.params._id

        const newAvatarUrl = req.body.avatar

        const chancedUser = await UsersModel.findByIdAndUpdate(req.params.id, { avatar: newAvatarUrl }, { returnDocument: "after" })

        const { passwordHash: _, ...userData } = chancedUser._doc

        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: 'user = undefined'
        })
    }

}

export const deleteFriend = async (req, res) => {
    try {

        const user = await UsersModel.findById(req.params.id)
        const friendId = req.body.friendId
        const friend = await UsersModel.findById(friendId)

        const chancedUser = await UsersModel.findByIdAndUpdate(req.params.id, {
            friends: user.friends.filter(item => item !== friendId)
        }, { returnDocument: "after" })

        await UsersModel.findByIdAndUpdate(friendId, {
            friends: friend.friends.filter(item => item !== req.params.id)
        }, { returnDocument: "after" })

        const { passwordHash: _, ...userData } = chancedUser._doc


        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: 'user = undefined'
        })
    }

}

