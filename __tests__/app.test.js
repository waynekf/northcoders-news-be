const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app.js");
const { seed, unseed } = require("../db/seeds/seed.js");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data");

beforeEach(() => {
  unseed();
  seed({ topicData, userData, articleData, commentData });
});

describe("GET /api", () => {
  test.skip("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: API call responds with an object containing an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({res: { text }}) => {
        const topics = JSON.parse(text).topics;
        expect(topics.length).toEqual(3);
        for (i = 0; i < topics.length; i++) {
          expect(topics[i]).toHaveProperty("slug");
          expect(topics[i]).toHaveProperty("description");
        }
      });
  });
});

afterEach(() => {
  unseed();
});

//afterAll(() => db.end());
