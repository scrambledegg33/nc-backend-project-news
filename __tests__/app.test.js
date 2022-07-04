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
            expect(body.msg).toBe('not found');
          });
      });
    });