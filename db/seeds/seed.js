const db = require("../connection");
const articles = require("../data/development-data/articles");
const {
  getTopics,
  getUsers,
  getArticles,
  getComments,
} = require("../seeds/utils.js");
var format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  let articles = [];

  return db
    .query(`DROP TABLE IF EXISTS Comments`)
    .then(() => db.query(`DROP TABLE IF EXISTS Articles CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS Users CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS Topics CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS user_topic CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS emoji_article_user CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS Emojis CASCADE`))
    .then(() => {
      const sql = `CREATE TABLE Topics (
      slug varchar(50) PRIMARY KEY NOT NULL ,
      description varchar(250) NOT NULL,
      img_url varchar(1000) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = format(
        "INSERT INTO Topics (slug, description, img_url) VALUES %L RETURNING *",
        getTopics(topicData),
      );

      return db.query(sql);
    })
    .then(() => {
      const sql = `CREATE TABLE Users (
      userName varchar(250) PRIMARY KEY NOT NULL ,
      name varchar(250) NOT NULL,
      avatar_url varchar(1000) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = format(
        "INSERT INTO Users (userName, name, avatar_url) VALUES %L RETURNING *",
        getUsers(userData),
      );

      return db.query(sql);
    })
    .then(() => {
      const sql = `CREATE TABLE Articles (
      article_id SERIAL PRIMARY KEY NOT NULL ,
      title varchar(250) NOT NULL,
      topic varchar(50) NOT NULL REFERENCES Topics(slug),
      author varchar(250) NOT NULL REFERENCES Users(userName),
      body text NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      votes integer NOT NULL DEFAULT 0,
      article_img_url varchar(1000) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = format(
        "INSERT INTO Articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *",
        getArticles(articleData),
      );

      return db.query(sql);
    })
    .then((data) => {
      articles = data.rows.map((article) => {
        return {
          id: article.article_id,
          title: article.title,
        };
      });

      const sql = `CREATE TABLE Comments (
      comment_id SERIAL PRIMARY KEY NOT NULL ,
      article_id integer NOT NULL REFERENCES Articles(article_id),
      body text NOT NULL,
      votes integer DEFAULT 0,
      author varchar(250) NOT NULL REFERENCES USERS(userName),
      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = format(
        "INSERT INTO Comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *",
        getComments(articles, commentData),
      );

      return db.query(sql);
    })
    .then(() => {
      const sql = `CREATE TABLE Emojis (
      emoji_id SERIAL PRIMARY KEY NOT NULL ,
      emoji varchar(250) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = `CREATE TABLE emoji_article_user (
      emoji_article_user_id SERIAL PRIMARY KEY NOT NULL,
      emoji_id int REFERENCES Emojis(emoji_id) NOT NULL,
      userName varchar(250) REFERENCES Users(userName) NOT NULL,
      article_id int REFERENCES Articles(article_id) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {
      const sql = `CREATE TABLE user_topic (
      user_topic_id SERIAL PRIMARY KEY NOT NULL,
      userName varchar(250) REFERENCES Users(userName) NOT NULL,
      topic varchar(50) REFERENCES Topics(slug) NOT NULL)`;

      return db.query(sql);
    })
    .then(() => {})
    .catch((error) => {
      console.log("ERROR CAUGHT IN CATCH!", "<<<---");
      console.log(error);
    })
    .finally(() => {});
};

const unseed = () => {
  return db
    .query(`DROP TABLE IF EXISTS Comments`)
    .then(() => db.query(`DROP TABLE IF EXISTS Articles CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS Users CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS Topics CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS user_topic CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS emoji_article_user CASCADE`))
    .then(() => db.query(`DROP TABLE IF EXISTS Emojis CASCADE`))
    .then(() => {})
    .catch((error) => {})
    .finally(() => {});
};

module.exports = {
  seed,
  unseed,
};
