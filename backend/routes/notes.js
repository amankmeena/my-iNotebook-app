const express = require('express');
const router = express.Router();
const Note = require('../models/Note')

const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

// ROUTE 1: Get All Notes using: GET "/api/notes/fetchallnotes". Login reqired
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during getting all notes'});
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login reqired
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charachters').isLength({ min: 5 })
], async (req, res) => {

    // for any errors return bad request and error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    try {
        // check whether the note with same title already exists
        let titlecheck = await Note.findOne({ title: req.body.title })

        if (titlecheck) {
            return res.status(400).json({ error: 'Note with same title already exists' })
        }

        const { title, description, tag } = req.body;
        const note = new Note({
            user: req.user.id, title, description, tag
        })
        
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during creating a new note'});
    }
})

// ROUTE 3: Update a Note using: PUT "/api/notes/updatenote/:id". Login reqired
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // Create a newNote Object
        const newNote = {};

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send({error: 'Not found'}) }

        // Allow update only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({error: 'Not Allowed'});
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during updating the note'});
    }
})

// ROUTE 4: Delete a Note using: DELETE "/api/notes/deletenote/:id". Login reqired
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send({error: 'Not found'}) }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({error: 'Not Allowed'});
        }

        note = await Note.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: 'internal server error during updating the note'});
    }
})

module.exports = router