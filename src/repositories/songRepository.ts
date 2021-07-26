import connection from "../database/database";

export async function getSongByName(name: string){
    const sql = `SELECT * FROM songs
                WHERE name = $1`;
    const existingSong = await connection.query(sql, [name]);    
    return existingSong;  
}

export async function getSongById(id: string){
    const sql = `SELECT * FROM songs
                WHERE id = $1`;
    const existingSong = await connection.query(sql, [id]);    
    return existingSong;  
}

export async function upvoteSong(id:string) {
    const sql = `UPDATE songs 
                SET score = score + 1 
                WHERE id = $1`;
    await connection.query(sql, [id]);    
}

export async function downvoteSong(id:string) {
    const sql = `UPDATE songs 
                SET score = score - 1 
                WHERE id = $1`;
    await connection.query(sql, [id]);    
}

export async function registerSong(song: string, link: string) {
    const sql = `INSERT INTO songs (name, link, score)
                 VALUES ($1, $2, $3)`;
    await connection.query(sql,[song, link, 1]);    
}

export async function deleteSong(id: string) {
    const sql = `DELETE from songs WHERE id = $1`;
    await connection.query(sql,[parseInt(id)]);    
}

export async function getLowScoreSongs(){
    const sql = `SELECT * from songs 
                 WHERE score <= 10`;
    const lowScoreSongs = await connection.query(sql);
    return lowScoreSongs.rows;
}

export async function getTopSongs(){
    const sql = `SELECT * from songs 
                 WHERE score > 10`;
    const topSongs = await connection.query(sql);
    return topSongs.rows;
}

export async function getTopList(amount: number) {

    const sql = `SELECT * FROM songs 
                 ORDER BY score DESC LIMIT $1`;

    const result = await connection.query(sql,[amount]);
    return result.rows.length === 0 ? false : result.rows;    
}


