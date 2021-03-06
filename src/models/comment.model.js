const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class CommentModel {
    tableName = 'comments';

    getByPostId = async (post_id) => {

        const sql = `SELECT c.id, c.author_id , c.post_id, c.text, c.creation_date, u.username as username, u.avatar_url as avatarUrl 
            FROM ${this.tableName} c
            inner join users u on c.author_id = u.id 
            WHERE post_id= ? order by creation_date desc `;

        const result = await query(sql, [post_id]);

        return result;
    }
    
    findOne = async ({comment_id}) => {

        const sql = `SELECT * FROM ${this.tableName}
        WHERE id= ? `;

        const result = await query(sql, [comment_id]);

        // return back the first row 
        return result[0];
    }
    
    create = async ({ post_id, author_id, text }) => {
        const sql = `INSERT INTO ${this.tableName}
        (post_id, author_id, text) VALUES (?,?,?)`;

        const result = await query(sql, [post_id, author_id, text]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, post_id, user_id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE post_id = ? AND user_id = ?`;

        const result = await query(sql, [...values, post_id, user_id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new CommentModel;