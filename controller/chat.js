import ChatModels from '../models/chat.js'

export const createChat = async (req, res) => {
    try {

        const chats = await ChatModels.find()
        const existChat = chats.some(
            el => el.members.some(
                item => item.includes(req.body.members[0])
            ) &&
                el.members.some(
                    item => item.includes(req.body.members[1])
                )

        )
        if (existChat) {
            return res.status(400).json({
                message: `такой чатик существует`
            })
        }

        // const creatorId = req.userId
        // const body = { ...req.body, creatorId, members: [{ userId: creatorId, role: 'admin' }] }
        const chat = await ChatModels(req.body)//body
        await chat.save()
        res.json({
            message: "Вы зaсуществовали чатик",
            status: "success",
            chatId: chat._id
        })

    } catch (err) {
        res.status(404).json({
            message: `не удалось создать чатик ${err.message}`
        })
    }
}

export const getAllChats = async (req, res) => {
    try {

        const userId = req.userId

        const chats = await ChatModels.find({ members: { $in: [userId] } })

        res.json(chats)

    } catch (err) {
        res.status(404).json({
            message: `не удалось получить чатик ${err.message}`
        })
    }
}