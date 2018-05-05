const router = require('koa-router')();
const user = require('../models/user');

router.prefix('/users');

router.get('/', async (ctx, next) => {
  let oneUser = await user.findById(1);
  ctx.body = { users: oneUser }
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router;
