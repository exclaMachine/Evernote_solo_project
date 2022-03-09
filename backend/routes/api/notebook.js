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

router.delete('/:id', asyncHandler (async(req, res) => {
    const deleteId = parseInt(req.params.id, 10)
    // console.log('******', deleteId)
    // const notesInNotebook = await Note.findAll({
    //     where: { notebookId: deleteId }
    // })
    // console.log(notesInNotebook);

    const notesInNotebook = await Note.destroy({
            where: { notebookId: deleteId }
        })

    // const destroyNotes = async (arr) => {
    //     await arr.map(note => note.destroy())
    // }

    // destroyNotes(notesInNotebook);

    // notesInNotebook.map(note => await note.destroy());

    // await notesInNotebook.destroy();
    // const nullify = notesInNotebook.map(note => note.notebookId = null)

    // console.log('nullll', notesInNotebook)
    const notebook = await Notebook.findByPk(deleteId);
    // console.log('Notebook to delete', notebook);

    await notebook.destroy();

    return res.json(deleteId);
}))

module.exports = router;
