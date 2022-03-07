const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Notebook, Note, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('', asyncHandler (async (req, res) => {

    const notebooks = await Notebook.findAll();
    console.log('nbs', notebooks)
    res.json(notebooks);

}))

router.post('', asyncHandler (async(req, res) => {
    const  notebook = await Notebook.create(req.body);
    res.json(notebook);
}))

module.exports = router;