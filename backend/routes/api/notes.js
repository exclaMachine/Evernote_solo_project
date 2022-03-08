const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Note, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('', asyncHandler (async (req, res) => {

    const notes = await Note.findAll();
    res.json(notes);

}))

router.post('', asyncHandler (async(req, res) => {
    const  note = await Note.create(req.body);
    res.json(note);
}))

module.exports = router;
