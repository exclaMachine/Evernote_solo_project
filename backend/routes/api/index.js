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

// GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-litionMan'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
}));

router.get(
    '/restore-user',
    restoreUser,
    (req, res) => {
      return res.json(req.user);
    }
  );

  const { requireAuth } = require('../../utils/auth.js');
  router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
      return res.json(req.user);
    }
  );


module.exports = router;
