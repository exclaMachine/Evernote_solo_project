const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Note, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateNote = [
    check('title')
      .notEmpty()
      .withMessage('Please provide a title.'),
    check('content')
      .notEmpty()
      .withMessage('Please provide a note.'),
    handleValidationErrors
  ];


router.get('', asyncHandler (async (req, res) => {

    const notes = await Note.findAll();
    res.json(notes);

}))


router.post('', validateNote, asyncHandler (async(req, res, next) => {
    console.log('body', req.body);
    const note = await Note.create(req.body);


    // console.log('*********', note)
    res.json(note);
}))


router.delete('/:id', asyncHandler(async(req, res) => {
    const deletedId = parseInt(req.params.id, 10)
    // console.log('paramssssss', deletedId);
    const found = await Note.findByPk(deletedId)
    // console.log('found', found)

    await found.destroy()

    return res.json(deletedId)
}))

router.put('/:id', asyncHandler(async(req, res) => {
    const updatedId = parseInt(req.params.id, 10);

    const found = await Note.findByPk(updatedId)
    // console.log({found});
    const updated = await found.update(req.body);

    return res.json(updated)

}))

module.exports = router;
