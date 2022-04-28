const supertest = require("supertest");
const index = require("../index");
let request = supertest(index);

test("A aplicação deve responder na porta 8686",() => {
  return request.get("/").then(res => {
    let status = res.statusCode
    expect(status).toEqual(200);
  }).catch(err => {
    fail(err)
  });
});