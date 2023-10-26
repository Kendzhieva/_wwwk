import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import accessToken from "./services/accessToken.js";
import { register, login } from "./controller/auth.js";
import { loginUserValidation, registerUserValidation } from "./validations/validations.js";
import validationResult from "./services/validationResult.js";
import activeUser from "./services/activeUser.js";
import { changeAvatarUrl, changeOneUser, deleteFriend, deleteOneUser, getAllUser, getOneUser } from "./controller/users.js";
import checkAuth from "./services/checkAuth.js";
import multer from 'multer'
import uploudFile from "./services/uploudFile.js";
import { v2 as cloudinary } from 'cloudinary';
import { addImage, deleteImages, getAllImages, setLikeImage } from './controller/images.js';
import { addPost, changeOnePost, deletePost, getAllPostComments, getAllPosts, getAllPostsGroup, getOnePost, setLikePost } from './controller/posts.js';
import { addPostComment, changePostComment, deletePostComment, getAllPostsComments, getOnePostComment, setLikePostComment } from './controller/postComments.js';
import { addRequest, callRequest, getMyInvite, getMyRequest } from './controller/request.js';
import { changeGroup, createGroup, deleteGroup, getAllGroups, getGroupInfo, joinGroup, leaveGroup } from './controller/groups.js';
import { createChat } from './controller/chat.js';
import { sendMessage } from './controller/message.js';

const api = express()
dotenv.config()  // Функция - для доступа к env файлам

const PORT = 3333 || process.env.PORT


api.use(express.json()) // middleware - для возможности перевода данных в нужный формат и доступ к req.body
api.use(cors()) // middleware - для возмжности доступа из фронтенда на сервер
api.use('/uploads', express.static('uploads'))



mongoose.connect(process.env.MONGODB)
    .then(() => console.log('>>> Mongo DB успешно запущен'))
    .catch((err) => console.log('>>> Ошибка при запуске Mongo DB ', err))


cloudinary.config({
    cloud_name: 'djuhicbhf',
    api_key: '291381791531391',
    api_secret: 'pxsgVarRXeDr7ng7HErF4kx9D90'
});



const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage })

api.post('/upload', upload.single('file'), uploudFile)

// auth

api.post('/register', registerUserValidation, validationResult, register)
api.post('/login', loginUserValidation, validationResult, login)
api.get('/active/:link', activeUser)

// users

api.get('/users', getAllUser)
api.get('/users/:id', getOneUser)
api.patch('/users/:id', changeOneUser)
api.patch('/users/avatar/:id', changeAvatarUrl)
api.delete('/users/:id', deleteOneUser)
api.patch('/users/friend/:id', deleteFriend)

// images
api.get('/images', getAllImages)
api.post('/images', checkAuth, addImage)
api.delete('/images/:id', deleteImages)
api.patch('/images/like/:id', setLikeImage)

// posts
api.get('/posts', getAllPosts)
api.get('/posts/group/:id', getAllPostsGroup)
api.get('/posts/:id', getOnePost)
api.post('/posts', checkAuth, addPost)
api.patch('/posts/:id', changeOnePost)
api.delete('/posts/:id', deletePost)
api.patch('/posts/like/:id', setLikePost)
api.get('/posts/comment/:id', getAllPostComments)


// posts comment
api.get('/comment', getAllPostsComments)
api.get('/comment/:id', getOnePostComment)
api.post('/comment', checkAuth, addPostComment)
api.patch('/comment/:id', changePostComment)
api.delete('/comment/:id', deletePostComment)
api.patch('/comment/like/:id', setLikePostComment)

//request
api.post('/request', checkAuth, addRequest)
api.get('/my/request/:id', getMyRequest)
api.get('/my/invite/:id', getMyInvite)
api.patch('/call/request/:id', callRequest)

// group
api.get('/groups', getAllGroups)
api.get('/groups/:id', getGroupInfo)
api.post('/groups', checkAuth, createGroup)
api.patch('/groups/:id', changeGroup)
api.delete('/groups/:id', deleteGroup)
api.patch('/groups/join/:id', joinGroup)
api.patch('/groups/leave/:id', leaveGroup)

//chat
api.post('/chat', createChat)

//message
api.post('/message', sendMessage)





const runServer = () => {
    try {
        api.listen(PORT, () => {
            console.log(`>>> Ваш сервер запущен на хосту http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(`>>> Ошибка при запуске сервера - ${err.message}`)
    }
}

runServer()