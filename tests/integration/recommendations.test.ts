import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database/database";
import { createSong } from "../factories/songFactory";

afterAll(async () => {
  await connection.end();
});

beforeEach(async () => {
  await connection.query(`TRUNCATE songs RESTART IDENTITY CASCADE`);
})

describe("POST /recommendations", () => {

  it("returns status 400 for empty song name", async () => {
    const result = await supertest(app)
      .post("/recommendations")
      .send({song: "", link: "https://www.youtube.com/watch?v=OMy8lKG6Atc"});
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty link", async () => {
    const result = await supertest(app)
      .post("/recommendations")
      .send({song: "Test song v.1", link: ""});
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for a invalid youtube url", async () => {
    const result = await supertest(app)
      .post("/recommendations")
      .send({song: "Test song v.2", link: "https://www.invalidurl.com/watch"});
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for a not string song type", async () => {
    const result = await supertest(app)
      .post("/recommendations")
      .send({song: 1, link: "https://www.youtube.com/watch?v=OMy8lKG6Atc"});
    expect(result.status).toEqual(400);
  });

  it("returns status 201 for valid params", async () => {
    const result = await supertest(app)
      .post("/recommendations")
      .send({song: "Test song v.3", link: "https://www.youtube.com/watch?v=OMy8lKG6Atc"});
    expect(result.status).toEqual(200);
  });
});

describe('POST /recommendations/:id/upvote', () =>{
  it('should answer status 200 for score updated', async () => {
    const result = await supertest(app)
      .post('/recommendations/1/upvote')   
    expect(result.status).toEqual(200);
  })

  it('should answer status 404 for valid id that does not exist', async () => {
    const song = await createSong()
    const response = await supertest(app).post('/recommendations/9/upvote').send(song);

    expect(response.status).toEqual(404);
  })

  it('should answer status 400 for invalid id', async () => {
    const song = await createSong()
    const response = await supertest(app).post('/recommendations/ronald/upvote').send(song);

    expect(response.status).toEqual(400);
  })

})

describe('POST /recommendations/:id/downvote', () =>{
  it('should answer status 200 for score updated', async () => {
    const song = await createSong()
    const response = await supertest(app).post('/recommendations/1/downvote').send(song);

    expect(response.status).toEqual(200);
  })

  it('should answer status 404 for valid id that does not exist', async () => {
    const song = await createSong()
    const response = await supertest(app).post('/recommendations/13/downvote').send(song);

    expect(response.status).toEqual(404);
  })

  it('should answer status 400 for invalid id', async () => {
    const song = await createSong()
    const response = await supertest(app).post('/recommendations/ronald/downvote').send(song);

    expect(response.status).toEqual(400);
  })

})

