import cloudinary from 'cloudinary';
import fs from "node:fs"


export default (req, res) => {
    console.log(req.file.originalname)

    const file = req.file

    if (!file) {
        res.status(400).send({ message: 'файл не найден' })
    }

    const fileName = `${file.originalname}`
    const tempFilePath = `uploads/${fileName}`


    try {
        cloudinary.v2.uploader.upload(tempFilePath,
            function (error, result) {
                if (error) {
                    throw new Error(error)
                } else {
                    fs.unlinkSync(tempFilePath)

                    console.log(result)
                    res.json({
                        status: "success",
                        message: "Картина добавлена",
                        url: result.secure_url
                    })
                }
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        })
    }




}