const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

afterAll(() => {
	return db.end();
});

beforeEach(() => {
    return seed(testData);
});

describe("1. GET /api/topics", () => {
	test("status:200, responds with an array of topics", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(( {body} ) => {
            expect(body.topics).toBeInstanceOf(Array);
            expect(body.topics).toHaveLength(3);
				body.topics.forEach((topic) => {
					expect(topic).toMatchObject(
						{
							description: expect.any(String),
							slug: expect.any(String),
						})
					
				});
			});
	});
    test('status:404, responds with an error message when given wrong endpoint', () => {
        return request(app)
          .get('/api/topicsss')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('path not found');
          });
      });
    });

    describe("2. GET /api/articles/:article_id", () => {
        test('status:200, responds with the article with the corresponding id', () => {
            const ARTICLE_ID = 2;
            return request(app)
              .get(`/api/articles/${ARTICLE_ID}`)
              .expect(200)
              .then(({ body }) => {
                expect(body.article).toEqual({
                  article_id: ARTICLE_ID,
                  author: 'icellusedkars',
                  title: 'Sony Vaio; or, The Laptop',
                  body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                  created_at: '2020-10-16T05:03:00.000Z',
                  topic: "mitch",
                  votes: 0
});
              });
          });
          test('status:400, responds with an error message when passed a bad user ID', () => {
            return request(app)
              .get('/api/articles/notAnId')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe('Invalid input');
              });
          });
          test('status:404, responds with an error message when given an id that doesnt correspond to an id in the data', () => {
            return request(app)
              .get('/api/articles/999999')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('not found');
              });
          });
})
describe("3. PATCH /api/articles/:article_id", () => {
	test("status:200, responds with the updated votes for the article", () => {
		const voteUpdates = {
			votes: 12
		};
		return request(app)
			.patch("/api/articles/1")
			.send(voteUpdates)
			.expect(200)
			.then(({ body }) => {
				expect(body.article).toEqual({
					article_id: 1,
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    author: "butter_bridge",
                    body: "I find this existence challenging",
                    created_at: "2020-07-09T20:11:00.000Z",
                    votes: 112
				});
			});
	});
    test("body: {} -> malformed body / missing required fields: 400 Bad Request", () => {
        const voteUpdates = {
			votes: {}
		};
		return request(app)
			.patch("/api/articles/1")
			.send(voteUpdates)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe('Invalid input');
              });
    })
    test("body: { increase_votes_by: 'word' } -> incorrect type: 400 Bad Request", () => {
        const voteUpdates = {
			votes: 'word'
		};
		return request(app)
			.patch("/api/articles/1")
			.send(voteUpdates)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe('Invalid input');
              });
    })
});