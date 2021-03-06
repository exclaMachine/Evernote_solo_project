const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const notebooksRouter = require('./notebook.js')
const notesRouter = require('./notes.js')


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notebooks', notebooksRouter)

router.use('/notes', notesRouter)

module.exports = router;
