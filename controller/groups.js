import GroupsModels from "../models/groups.js";


export const getAllGroups = async (req, res) => {
    try {
        let filter = {
            // isActivated: true
        }

        if (req.query.creatorId) {
            filter.creatorId = req.query.creatorId
        }

        let groups = await GroupsModels.find(filter)

        res.json(groups)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить post`ы'
        })
    }
}


export const createGroup = async (req, res) => {
    try {

        const creatorId = req.userId
        const body = { ...req.body, creatorId, members: [{ userId: creatorId, role: 'admin' }] }
        const group = await GroupsModels(body)
        await group.save()
        res.json({
            message: "Вы зaсуществовали group`y",
            status: "success",
            groupId: group._id
        })

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const getGroupInfo = async (req, res) => {
    try {

        const group = await GroupsModels.findById(req.params.id)

        res.json(group)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Не удалось получить group'y - ${err.message}`
        })
    }
}

export const changeGroup = async (req, res) => {
    try {

        const { _id, creatorId, ...other } = req.body

        const chancedGroup = await GroupsModels.findByIdAndUpdate(req.params.id, other,
            { returnDocument: "after" }
        )

        res.json(chancedGroup)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось переписать существование group'
        })
    }
}

export const deleteGroup = async (req, res) => {
    try {

        const existingGroup = await GroupsModels.findByIdAndRemove(req.params.id)

        if (existingGroup) {
            res.json({
                message: "Вы замазали cуществования Group",
                status: "success"
            })
        }


    } catch (err) {
        res.status(500).json({
            message: `Вaм не удалось замазалть cуществования Group ${err.message}`
        })
    }
}


export const joinGroup = async (req, res) => {
    try {

        const groupId = req.params.id
        const group = await GroupsModels.findById(groupId)


        await GroupsModels.findByIdAndUpdate(groupId, {
            members: [...group.members, { userId: req.body.userId, role: "follower" }]
        })

        res.json({
            status: 'success',
            message: 'вы подписалися)'
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось войти в существования Group`ы'
        })
    }
}

export const leaveGroup = async (req, res) => {
    try {
        //получение группы
        const groupId = req.params.id
        const group = await GroupsModels.findById(groupId)


        await GroupsModels.findByIdAndUpdate(groupId, {
            members: group.members.filter(item => item.userId !== req.body.userId)
        })

        res.json({
            status: 'success',
            message: 'вы отподписалися)'
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось выйти из существования Group`ы'
        })
    }
}


