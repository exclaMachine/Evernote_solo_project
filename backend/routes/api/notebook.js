const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Notebook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = require('./session');

router.get('/', (req, res) => {
    const { title } = req.body;
    //think i need to add the user here or on the frontend notebook List page
    const notebooks = Notebook.findAll();
    res.json(notebooks);
    console.log(notebooks)

})

module.exports = router;
