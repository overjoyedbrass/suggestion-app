import express from 'express';
import db from './database/database.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './errors.js'
import cors from 'cors'
import { PORT } from './config.js'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routesPath = path.join(__dirname, 'routes')
const routesFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'));

app.get("/", async (_req, res) => {
    res.send("This is root.")
})

app.use(cors())

app.use(express.static('uploads'))

for (const file of routesFiles) {
    var { router } = await import(`./routes/${file}`);
    const [route, _] = file.split('.')
    app.use(`/api/${route}`, router)
}

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log("Server is running.");
    await db.createTable();
})
