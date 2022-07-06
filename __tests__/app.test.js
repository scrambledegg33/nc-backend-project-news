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
                  votes: 0,
                  comment_count: 0
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
    
    

    test("endpoint articles/9999 should return a 404 not found.", () => {
      const voteUpdates = {
        votes: 7
      };
      return request(app)
        .patch("/api/articles/9999")
        .send(voteUpdates)
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).toBe('not found');
                });
    })


});


describe("4. GET /api/users", () => {
	test("status:200, responds with an array of users", () => {
		return request(app)
			.get("/api/users")
			.expect(200)
			.then(( {body} ) => {
            expect(body.users).toBeInstanceOf(Array);
            expect(body.users).toHaveLength(4);
				body.users.forEach((user) => {
					expect(user).toMatchObject(
						{
							username: expect.any(String),
							name: expect.any(String),
                            avatar_url: expect.any(String)
						})
					
				});
			});
	});
    
    test('status:404, responds with an error message when given wrong endpoint', () => {
        return request(app)
          .get('/api/usersss')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('path not found');
          });
      });
    });


    describe("task 7 testing that comment_count is working", () => {
      test('checking sql query implements count functionality', () => {
          const ARTICLE_ID = 1;
          return request(app)
            .get(`/api/articles/${ARTICLE_ID}`)
            .expect(200)
            .then(({ body }) => {
              expect(body.article).toEqual({
                article_id: ARTICLE_ID,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 100,
                comment_count: 11
});
            });
        });
      });


      describe("8. GET /api/articles", () => {
        test("status:200, responds with an array of articles", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(( {body} ) => {
                  expect(body.articles).toBeInstanceOf(Array);
                  expect(body.articles).toHaveLength(12);
              body.articles.forEach((article) => {
                expect(article).toMatchObject(
                  {
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    comment_count: expect.any(Number),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                  })
                
              });
            });
        });
          
          test('status:404, responds with an error message when given wrong endpoint', () => {
              return request(app)
                .get('/api/articleeee')
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).toBe('path not found');
                });
            });
          });

     describe('task 9 find the all the comments for a given article ID, /api/articles/:article_id/comments', () => {
      test('status: 200, responds with a array of one comment for the article with the given article ID', () => {
        const ARTICLE_ID = 6;
        return request(app)
          .get(`/api/articles/${ARTICLE_ID}/comments`)
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeInstanceOf(Array);
            expect(body.comments).toHaveLength(1);
            expect(body.comments).toEqual([{
              comment_id: 16,
              votes: 1,
              created_at: '2020-10-11T15:23:00.000Z',
              author: 'butter_bridge',
              body: "This is a bad article name"
      }])
     })     
     
    })
    test('status: 200, responds with a array of multiple comments associated with the article with the given article ID', () => {
      const ARTICLE_ID = 9;
      return request(app)
        .get(`/api/articles/${ARTICLE_ID}/comments`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeInstanceOf(Array);
          expect(body.comments).toHaveLength(2);
          expect(body.comments).toEqual([{
            comment_id: 1,
            votes: 16,
            created_at: "2020-04-06T12:17:00.000Z",
            author: 'butter_bridge',
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
    }, {
            comment_id: 17,
            votes: 20,
            created_at: "2020-03-14T17:02:00.000Z",
            author: "icellusedkars",
            body: "The owls are not what they seem."
    }])
   })     
   
  })
  test('/api/articles/9999/comments -> article that does not exist: 404 Not Found', () => {
    return request(app)
      .get('/api/articles/9999/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
  test('/api/articles/notAnId/comments -> invalid ID: 400 Bad Request', () => {
    return request(app)
      .get('/api/articles/notAnId/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid input');
      });
  });
  test('/api/articles/4/comments -> article that does not have any comments', () => {
    return request(app)
      .get('/api/articles/4/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('not found');
      });
  });
  });

  describe('POST /api/articles/:article_id/comments', () => {
    test("status:201, responds with comment newly added to the comments database", () => {
  
      const newComment = {
        username : "lurker",
        body: 'lurking around'
      };
      return request(app)
        .post(`/api/articles/2/comments`)
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            article_id: expect.any(Number),
            author: 'lurker',
            body: 'lurking around',
            comment_id: expect.any(Number),
            votes: 0,
            created_at: expect.any(String) 
          });
        });
    });
   /* test("body: { username:  6,  body: 'hello' } -> failing schema validation, username must be a string: 400 Bad Request", () => {
      const comment = {
        username: 6,
        body: 'hello'
  };
  return request(app)
    .post("/api/articles/1/comments")
    .send(comment)
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Invalid input');
            });
          })
  test("body: {} -> malformed body / missing required fields: 400 Bad Request", () => {
      const newComment = {
          username: {},
          body: {}
        };
        return request(app)
          .patch("/api/articles/1/comments")
          .send(newComment)
                  .expect(400)
                  .then(({ body }) => {
                    expect(body.msg).toBe('Invalid input');
                  });
        })*/


  })