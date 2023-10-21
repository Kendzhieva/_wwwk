import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//     host: process.env.MAILHOST,
//     port: process.env.MAILPORT,
//     auth: {
//         user: process.env.MAILUSER,
//         pass: process.env.MAILPASS
//     }
// })

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'maxbirimkulov99@gmail.com',
        pass: 'bvmxerfsaswnfkwc'
    }
})

export const sendActivationMail = async (to, link) => {

    await transporter.sendMail({
        from: 'maxbirimkulov99@gmail.com',
        to,
        subject: `Активация аккаунта http://localhost:3333`,
        text: '',
        html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
    })
}

// export const sendActivationMail = async (to, link) => {
//     await transporter.sendMail({
//         from: process.env.MAILUSER,
//         to,
//         subject: `Активация аккаунта ${process.env.SERVERHOST}`,
//         text: '',
//         html:
//             `
//                 <div>
//                     <h1>Для активации перейдите по ссылке</h1>
//                     <a href="${link}">${link}</a>
//                 </div>
//             `
//     })
// }


export const sendResetPasswordMail = async (to, link) => {
    await transporter.sendMail({
        from: process.env.MAILUSER,
        to,
        subject: `Сброс пароля ${process.env.SERVERHOST}`,
        text: '',
        html:
            `
                <div>
                    <h1>Для сброса пароля перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
    })
}
