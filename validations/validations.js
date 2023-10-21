import { body } from "express-validator";

export const registerUserValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('avatar', 'Неверный путь').optional().isString(),
    body('images', 'Неверный формат картиной').optional().isArray(),
    body('name', 'Укажите ваше имя').isString(),
    body('surname', 'Укажите вашу фамилию').isString(),
    body('birthday', 'Укажите вашу дату рождения').optional().isDate(),
    body('password', 'Пароль должен быть минимум 8 символов').isString().isLength({ min: 8 }),
    body('phone', 'Неверный формат телефона ').optional().isString().isLength({ min: 10 }),
]


export const loginUserValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isString().isLength({ min: 8 }),
]