import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database/database";

afterAll(async () => {
  await connection.end();
});

beforeEach(async () => {
  await connection.query("DELETE * from songs");
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
