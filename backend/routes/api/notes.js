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

router.delete('/:id', asyncHandler(async(req, res) => {
    const deletedId = parseInt(req.params.id, 10)
    console.log('paramssssss', deletedId);
    const found = await Note.findByPk(deletedId)
    console.log('found', found)

    await found.destroy()

    return res.json(deletedId)
}))

module.exports = router;
