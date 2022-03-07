const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const notebooksRouter = require('./notebook.js')

router.use('/notebooks', notebooksRouter)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


module.exports = router;
