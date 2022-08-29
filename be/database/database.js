import Database from 'better-sqlite3'
const db = new Database('./database/database.db');

export default {
    createTable: async () => {
        const query = db.prepare(`
            CREATE TABLE IF NOT EXISTS suggestions (
                id integer PRIMARY KEY,
                name text NOT NULL,
                surname text NOT NULL,
                address text NOT NULL,
                description text NOT NULL,
                filename text NOT NULL,
                date timestamp DEFAULT CURRENT_TIMESTAMP
            )`)
        query.run()
    },

    selectAllSuggestions: async () => {
        const query = db.prepare("SELECT * FROM suggestions");
        return query.all()
    },

    selectSuggestion: async (id) => {
        const query = db.prepare("SELECT * FROM suggestions WHERE id = @id")
        return query.get({id: id})
    },
    insertSuggestion: async(suggestion) => {
        const insert = db.prepare(`
            INSERT OR REPLACE INTO suggestions
            (name, surname, address, description, filename) 
            VALUES 
            (@name, @surname, @address, @description, @filename)
            returning id
        `);
        return insert.get(suggestion)
    },
}