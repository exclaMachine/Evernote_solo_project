const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body});
});


router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});


module.exports = router;
