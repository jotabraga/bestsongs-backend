import faker from 'faker';
import supertest from "supertest";
import app from "../../src/app";

export async function createSong(){
    const song = {
        name: faker.name.findName(),
        youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }
    await supertest(app).post('/recommendations').send(song);

    return song
}