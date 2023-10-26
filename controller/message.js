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