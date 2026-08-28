const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 5 characters').isLength({ min: 5 }),
    body('description')
        .custom((value, { req }) => {
            const description = typeof value === 'string' ? value : req.body.discription;
            return typeof description === 'string' && description.trim().length >= 5;
        })
        .withMessage('Description must be at least 5 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { title, tag } = req.body;
        const description = (req.body.description || req.body.discription || '').trim();
        const note = new Notes({
            title,
            description,
            tag: tag || 'General',
            user: req.user.id
        });

        const savedNote = await note.save();
        return res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title must be at least 5 characters').isLength({ min: 5 }),
    body('description')
        .custom((value, { req }) => {
            const description = typeof value === 'string' ? value : req.body.discription;
            return typeof description === 'string' && description.trim().length >= 5;
        })
        .withMessage('Description must be at least 5 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { title, description, tag } = req.body;
        const newNotes = {};
        if (title) { newNotes.title = title; }
        if (description) { newNotes.description = description; }
        if (tag) { newNotes.tag = tag; }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to edit this note" });
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        return res.json(note);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized to delete this note" });
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        return res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;