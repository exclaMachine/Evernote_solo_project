const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body});
});


router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});


module.exports = router;
