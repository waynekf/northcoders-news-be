const db = require("./db/connection.js");

const users = () => {
    db.query(`SELECT * FROM Users;`)
        .then(({rows}) => {
            console.log("all users:");
            console.log(rows);
        });
    };

const codingArticles = () => {
    db.query(`SELECT * FROM Articles WHERE Topic = 'coding';`)
        .then(({rows}) => {
            console.log("all coding articles:");
            console.log(rows);
        });
    };

const commentsWithNegativeVotes = () => {
    db.query(`SELECT * FROM Comments WHERE votes < 0;`)
        .then(({rows}) => {
            console.log("comments with negative votes:");
            console.log(rows);
        });
    };

const articlesByGrumpy19 = () => {
    db.query(`SELECT * FROM Articles WHERE author = 'grumpy19';`)
        .then(({rows}) => {
            console.log("articles by Grumpy19:");
            console.log(rows);
        });
    };

const commentsWithMoreThan10Votes = () => {
    db.query(`SELECT * FROM Comments WHERE votes > 10;`)
        .then(({rows}) => {
            console.log("comments with more than 10 votes:");
            console.log(rows);
        });
    };

users();
codingArticles();
commentsWithNegativeVotes();
articlesByGrumpy19();
commentsWithMoreThan10Votes();
