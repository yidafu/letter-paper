const { app, mock, assert } = require('egg-mock/bootstrap');

/* eslint no-undef: off */
describe('test/controller/home.test.js', () => {
  // test cases
  it('get content (default params):', async function() {
    const ctx = app.mockContext();
    const contents = await ctx.service.content.index();
    assert(contents);
    assert(contents.length > 0);
  });
  it('get content (offset: 0, limit: 1):', async function () {
    const ctx = app.mockContext();
    const contents = await ctx.service.content.index(0, 1);
    assert(contents);
    assert(contents.length === 1);
  });
});
