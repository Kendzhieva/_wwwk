import MessageModel from '../models/message.js'

export const sendMessage = async (req, res) => {
    try {


        // const creatorId = req.userId
        // const body = { ...req.body, creatorId, members: [{ userId: creatorId, role: 'admin' }] }
        const message = await MessageModel(req.body)//body
        await message.save()
        res.json({
            message: "Вы кинули message",
            status: "success",
            chatId: message._id
        })

    } catch (err) {
        res.status(404).json({
            message: `не удалось кинуть message ${err.message}`
        })
    }
}

export const getAllMessages = async (req, res) => {
    try {

        const chatId = req.params.chatId

        const messages = await MessageModel.find({ chatId: chatId })

        res.json(messages)

    } catch (err) {
        res.status(404).json({
            message: `не удалось получить messages ${err.message}`
        })
    }
}

export const changeMessages = async (req, res) => {
    try {

        const messageId = req.params.messageId

        const chancedMessage = await MessageModel.findByIdAndUpdate(messageId,
            {
                message: req.body.message,
                edited: true
            },
            { returnDocument: "after" }
        )

        res.json(chancedMessage)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось переписать message'
        })
    }
}


export const deleteMessage = async (req, res) => {
    try {

        const messageId = req.params.messageId

        const existingMessage = await MessageModel.findByIdAndRemove(messageId)

        if (existingMessage) {
            res.json({
                status: 'success',
                message: 'удалось удаленть message'
            })
        } else {
            res.json({
                status: 'error',
                message: 'не удалось найти message'
            })
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'error',
            message: 'Не удалось удаленть message'
        })
    }
}