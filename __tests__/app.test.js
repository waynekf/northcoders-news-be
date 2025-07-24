const db = require("../db/connection.js");
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

afterEach(() => {
  //  unseed();
});

afterAll(() => db.end());

describe("GET /api", () => {
  test.skip("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
})

describe("GET /api/topics", () => {
  test("200: API call responds with an object containing an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ res: { text } }) => {
        const topics = JSON.parse(text).topics;
        expect(topics.length).toEqual(3);
        for (i = 0; i < topics.length; i++) {
          expect(topics[i]).toHaveProperty("slug");
          expect(topics[i]).toHaveProperty("description");
        }
      });
  });
})

describe("GET /api/articles", () => {
  test("200: API call responds with an object containing an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ res: { text } }) => {
        const articles = JSON.parse(text).articles;
        expect(articles.length).toEqual(5);
        for (i = 0; i < articles.length; i++) {
          expect(articles[i]).toHaveProperty("author");
          expect(articles[i]).toHaveProperty("title");
          expect(articles[i]).toHaveProperty("article_id");
          expect(articles[i]).toHaveProperty("topic");
          expect(articles[i]).toHaveProperty("created_at");
          expect(articles[i]).toHaveProperty("votes");
          expect(articles[i]).toHaveProperty("article_img_url");
          expect(articles[i]).toHaveProperty("comment_count");
        }
      });
  });
})
