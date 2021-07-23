import connection from "../database/database";

export async function getSongByName(name: string){
    const sql = `SELECT * FROM songs
                WHERE name = $1`;
    const existingSong = await connection.query(sql, [name]);    
    return existingSong;  
}

export async function upvoteSong(name:string) {
    const sql = `UPDATE songs 
                SET score = score + 1 
                WHERE name = $1`;
    await connection.query(sql, [name]);    
}

export async function registerSong(song: string, link: string) {
    const sql = `INSERT INTO songs (name, link, score)
                 VALUES ($1, $2, $3)`;
    await connection.query(sql,[song, link, 1]);    
}