const db = require('./conn.js');

class Post {
    constructor(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
    }

    static async getAll() {
        try {
            const response = await db.any(`
            SELECT * from posts`)
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getById(p_id) {
        try {
            const response = await db.one(`
            SELECT * from posts
            where id=${p_id}`)
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async removeEntry(p_id) {
        try {
            const response = await db.result(`
            DELETE from posts
            where id=${p_id}`)
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async addPost(title, content, id) {
        const query = `
        INSERT into posts
            (title, content, author_id)
        VALUES
            ('${title}', '${content}', ${id})`;
        try {
            const response = await db.result(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async updateEntry(id, column, content) {
        try {
            const response = await db.result(`
                UPDATE posts
                SET ${column} = $1
                WHERE id = $2`,
                [content, id]
            )
            return response;
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = Post;