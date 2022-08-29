import multer from "multer"
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        const filetype = file.mimetype.split("/")[1]
        cb(null, `${uuidv4()}.${filetype}`)
    }
})

export const upload = multer({ 
    storage: storage,
    limits: 1000000,
})

export const PORT = 8080
