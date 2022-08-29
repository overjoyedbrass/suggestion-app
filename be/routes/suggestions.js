import { Router } from 'express'
import db from '../database/database.js'
import { 
    MissingArgumentError,
    IdMatchNoResource,
    BodyRequiredError
} from '../errors.js'
import { upload } from '../config.js'
const router = Router();

router.get('/', async (_req, res, next) => {
    try {
        const data = await db.selectAllSuggestions();
        return res.send(data);
    } catch (err) {
        return next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!id) {
            throw new MissingArgumentError("ID missing")
        }

        const data = await db.selectSuggestion(id);
        if(!data){
            throw new IdMatchNoResource(`Resource with ${id} does not exist`)
        }
        return res.send(data);

    } catch (err) {
        return next(err)
    }
})

router.post('/', upload.single("image"), async (req, res, next) => {
    try {
        const data = req.body;
        const file = req.file

        if(!data) {
            throw new BodyRequiredError("Data not provided")
        }
        const suggestion = {
             name: data.name,
             surname: data.surname,
             address: data.address + " " + data.zipcode.toString(),
             description: data.description,
             filename: file.filename,
        }
        const id = await db.insertSuggestion(suggestion);
        return res.status(200).end()
    } catch (err) {
        return next(err)
    }
})

export { router }