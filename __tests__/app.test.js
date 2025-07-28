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
  //unseed();
  seed({ topicData, userData, articleData, commentData });
});

afterEach(() => {
  //unseed();
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
});

describe("GET /api/topics", () => {
  test.skip("200: API call responds with an object containing an array of topics", () => {
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
});

describe("GET /api/articles", () => {
  test.skip("200: API call responds with an object containing an array of articles", () => {
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

  test.skip("200: API call responds with an object containing an array of comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ res: { text } }) => {
        const comments = JSON.parse(text).comments;
        console.log(comments.length);
        expect(comments.length).toEqual(11);
        for (i = 0; i < comments.length; i++) {
          expect(comments[i]).toHaveProperty("comment_id");
          expect(comments[i]).toHaveProperty("article_id");
          expect(comments[i]).toHaveProperty("body");
          expect(comments[i]).toHaveProperty("text");
          expect(comments[i]).toHaveProperty("votes");
          expect(comments[i]).toHaveProperty("author");
          expect(comments[i]).toHaveProperty("created_at");
        }
      });
  });

  test.skip("200: API call responds with an object containing a single article", () => {
    return request(app)
      .get("/api/articles/5")
      .expect(200)
      .then(({ res: { text } }) => {
        const article = JSON.parse(text).article;
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");
      });
  });

  test.skip("200: API call responds with an object containing an array of comments associated with a specified article", () => {
    /*TODO: not quite working yet*/
    return request(app)
      .post("/api/articles/3/comments")
      .send({
        author: "icellusedkars",
        body: "mybody",
      })
      .expect(200)
      .then((data) => {
        //console.log(data, "<<<---");
      });
  });

  test.skip("200: API call successfully increments by 1 the number of votes associated with a specified article", () => {
    const expected = {
      "article_id":4,
      "title":"Student SUES Mitch!",
      "topic":"mitch",
      "author":"rogersop",
      "body":"We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
      "created_at":"2020-05-06T01:14:00.000Z",
      "votes":1,
      "article_img_url":"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
    }; 
    return request(app)
      .patch("/api/articles/4")
      .send({
        inc_votes: "1",
      })
      .expect(200)
      .then(({text}) => {
        const actual = JSON.parse(text);
        const { votes } = expected;
        expect(actual).toEqual(expected);
        expect(votes).toEqual(1);
      });
  });

  test.skip("200: API call successfully decrements by 1 the number of votes associated with a specified article", () => {
    const expected = {
      "article_id":4,
      "title":"Student SUES Mitch!",
      "topic":"mitch",
      "author":"rogersop",
      "body":"We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
      "created_at":"2020-05-06T01:14:00.000Z",
      "votes":-1,
      "article_img_url":"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
    }; 
    return request(app)
      .patch("/api/articles/4")
      .send({
        inc_votes: "-1",
      })
      .expect(200)
      .then(({text}) => {
        const actual = JSON.parse(text);
        const { votes } = expected;
        expect(actual).toEqual(expected);
        expect(votes).toEqual(-1);
      });
  });

  test.skip("400: API call returns appropriate error when request is made to increment number of votes by zero", () => {
    const expected = {
      msg: "Unable to patch article '4' as number of votes must be non-zero"
    };
    return request(app)
      .patch("/api/articles/4")
      .send({
        inc_votes: "0",
      })
      .expect(400)
      .then(({text}) => {
        const actual = JSON.parse(text);
        expect(actual).toEqual(expected);
      });
  });

  test.skip("400: API call returns appropriate error when request is made to increment number of votes by a non numeric value", () => {
    const expected = {
      msg: "Unable to patch article '4' as number of votes cannot be a non-integer"
    };
    return request(app)
      .patch("/api/articles/4")
      .send({
        inc_votes: "one",
      })
      .expect(400)
      .then(({text}) => {
        const actual = JSON.parse(text);
        expect(actual).toEqual(expected);
      });
  });

  test.skip("400: API call returns appropriate error when request is made to increment number of votes for an invalid article id", () => {
    const expected = {
      msg: "Article 'four' must be numeric"
    };
    return request(app)
      .patch("/api/articles/four")
      .send({
        inc_votes: "1",
      })
      .expect(400)
      .then(({text}) => {
        const actual = JSON.parse(text);
        expect(actual).toEqual(expected);
      });
  });

  test.skip("404: API call responds with a not found error given specified article does not exist", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((data) => {
        const error = JSON.parse(data.res.text);
        expect(error.msg).toEqual("article '9999' not found");
      });
  });

  test.skip("404: API call responds with a not found error given specified article does not exist", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((data) => {
        const error = JSON.parse(data.res.text);
        expect(error.msg).toEqual("article '9999' not found");
      });
  });

  test.skip("404: API call responds with a not found error given specified article does not have any comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(404)
      .then((data) => {
        const error = JSON.parse(data.res.text);
        expect(error.msg).toEqual("Messages for article '2' not found");
      });
  });
});

describe("GET /api/users", () => {
  test.skip("200: API call responds with an object containing an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ res: { text } }) => {
        const users = JSON.parse(text).users;
        expect(users.length).toEqual(4);
        for (i = 0; i < users.length; i++) {
          expect(users[i]).toHaveProperty("username");
          expect(users[i]).toHaveProperty("name");
          expect(users[i]).toHaveProperty("avatar_url");
        }
      });
  });
});
