const {
  convertTimestampToDate,
  getTopics,
  getUsers,
  getArticles,
  getComments,
} = require("../db/seeds/utils");
const devData = require("../db/data/test-data/index.js");

describe("getTopics", () => {
  test("converts an array of topic objects to a 2 dimensional array returning an empty array given empty input", () => {
    //Arrange
    const expected = [];

    //Act
    const actual = getTopics([]);

    //Assert
    expect(actual).toEqual(expected);
  });

  test("converts an array of topic objects to a 2 dimensional array", () => {
    //Arrange
    const expected = [
      ["mitch", "The man, the Mitch, the legend", ""],
      ["cats", "Not dogs", ""],
      ["paper", "what books are made of", ""],
    ];

    //Act
    const actual = getTopics(devData.topicData);

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("getUsers", () => {
  test("converts an array of user objects to a 2 dimensional array returning an empty array given empty input", () => {
    //Arrange
    const expected = [];

    //Act
    const actual = getUsers([]);

    //Assert
    expect(actual).toEqual(expected);
  });

  test("converts an array of user objects to a 2 dimensional array", () => {
    //Arrange
    const expected = [
      [
        "butter_bridge",
        "jonny",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
      [
        "icellusedkars",
        "sam",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      ],
      [
        "rogersop",
        "paul",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      ],
      [
        "lurker",
        "do_nothing",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      ],
    ];

    //Act
    const actual = getUsers(devData.userData);

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("getArticles", () => {
  test("converts an array of article objects to a 2 dimensional array returning an empty array given empty input", () => {
    //Arrange
    const expected = [];

    //Act
    const actual = getArticles([]);

    //Assert
    expect(actual).toEqual(expected);
  });

  test("converts an array of article objects to a 2 dimensional array", () => {
    //Arrange
    const expected = [
      [
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        convertTimestampToDate({ created_at: "2020-07-09T21:11:00.000Z" }).created_at,
        100,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Sony Vaio; or, The Laptop",
        "mitch",
        "icellusedkars",
        "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        convertTimestampToDate({ created_at: "2020-10-16T06:03:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Eight pug gifs that remind me of mitch",
        "mitch",
        "icellusedkars",
        "some gifs",
        convertTimestampToDate({ created_at: "2020-11-03T09:12:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Student SUES Mitch!",
        "mitch",
        "rogersop",
        "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        convertTimestampToDate({ created_at: "2020-05-06T02:14:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "UNCOVERED: catspiracy to bring down democracy",
        "cats",
        "rogersop",
        "Bastet walks amongst us, and the cats are taking arms!",
        convertTimestampToDate({ created_at: "2020-08-03T14:14:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "A",
        "mitch",
        "icellusedkars",
        "Delicious tin of cat food",
        convertTimestampToDate({ created_at: "2020-10-18T02:00:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Z",
        "mitch",
        "icellusedkars",
        "I was hungry.",
        convertTimestampToDate({ created_at: "2020-01-07T14:08:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Does Mitch predate civilisation?",
        "mitch",
        "icellusedkars",
        "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
        convertTimestampToDate({ created_at: "2020-04-17T02:08:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "They're not exactly dogs, are they?",
        "mitch",
        "butter_bridge",
        "Well? Think about it.",
        convertTimestampToDate({ created_at: "2020-06-06T10:10:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Seven inspirational thought leaders from Manchester UK",
        "mitch",
        "rogersop",
        "Who are we kidding, there is only one, and it's Mitch!",
        convertTimestampToDate({ created_at: "2020-05-14T05:15:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Am I a cat?",
        "mitch",
        "icellusedkars",
        "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
        convertTimestampToDate({ created_at: "2020-01-15T22:21:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Moustache",
        "mitch",
        "butter_bridge",
        "Have you seen the size of that thing?",
        convertTimestampToDate({ created_at: "2020-10-11T12:24:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Another article about Mitch",
        "mitch",
        "butter_bridge",
        "There will never be enough articles about Mitch!",
        convertTimestampToDate({ created_at: "2020-10-11T12:24:00.000Z" }).created_at,
        0,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
    ];

    //Act
    const actual = getArticles(devData.articleData);

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("getComments", () => {
  test("converts an array of comment objects to a 2 dimensional array returning an empty array given empty input", () => {
    //Arrange
    const expected = [];

    //Act
    const actual = getComments([], []);

    //Assert
    expect(actual).toEqual(expected);
  });

  test("converts an array of comment objects to a 2 dimensional array", () => {
    //Arrange
    const expected = [
      [
        undefined,
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",
        convertTimestampToDate({ created_at: "2020-04-06T13:17:00.000Z" }).created_at,
      ],
      [
        undefined,
        "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        14,
        "butter_bridge",
        convertTimestampToDate({ created_at: "2020-10-31T03:03:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        100,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-03-01T01:13:00.000Z" }).created_at,
      ],
      [
        undefined,
        " I carry a log — yes. Is it funny to you? It is not to me.",
        -100,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-02-23T12:01:00.000Z" }).created_at,
      ],
      [
        undefined,
        "I hate streaming noses",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-11-03T21:00:00.000Z" }).created_at,
      ],
      [
        undefined,
        "I hate streaming eyes even more",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-04-11T22:02:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Lobster pot",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-05-15T21:19:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Delicious crackerbreads",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-04-14T21:19:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Superficially charming",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-01-01T03:08:00.000Z" }).created_at,
      ],
      [
        undefined,
        "git push origin master",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-06-20T08:24:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Ambidextrous marsupial",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-09-20T00:10:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Massive intercranial brain haemorrhage",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-03-02T07:10:00.000Z" }).created_at,
      ],
      [
        undefined,
        "Fruit pastilles",
        0,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-06-15T11:25:00.000Z" }).created_at,
      ],
      [
        undefined,
        "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        16,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-06-09T06:00:00.000Z" }).created_at,
      ],
      [
        undefined,
        "I am 100% sure that we're not completely sure.",
        1,
        "butter_bridge",
        convertTimestampToDate({ created_at: "2020-11-24T00:08:00.000Z" }).created_at,
      ],
      [
        undefined,
        "This is a bad article name",
        1,
        "butter_bridge",
        convertTimestampToDate({ created_at: "2020-10-11T16:23:00.000Z" }).created_at,
      ],
      [
        undefined,
        "The owls are not what they seem.",
        20,
        "icellusedkars",
        convertTimestampToDate({ created_at: "2020-03-14T17:02:00.000Z" }).created_at,
      ],
      [
        undefined,
        "This morning, I showered for nine minutes.",
        16,
        "butter_bridge",
        convertTimestampToDate({ created_at: "2020-07-21T01:20:00.000Z" }).created_at,
      ],
    ];

    //Act
    const actual = getComments(devData.articleData, devData.commentData);

    //Assert
    expect(actual).toEqual(expected);
  });
});

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});