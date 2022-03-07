const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Notebook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = require('./session');

router.get('/', asyncHandler (async (req, res) => {
    const {userId} = req.session.auth
    const { title } = req.body;
    console.log(title);
    const notebooks = await Notebook.findAll(
        // {
        //     where: {userId}
        // }
    );
    console.log(notebooks.title)
    res.json(notebooks);

}))

module.exports = router;
