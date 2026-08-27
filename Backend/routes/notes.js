const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// get all the notes using: GET "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// add a new note using: POST "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description')
        .custom((value, { req }) => {
            const description = typeof value === 'string' ? value : req.body.discription;
            return typeof description === 'string' && description.trim().length >= 5;
        })
        .withMessage('Enter a valid description')
],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { title, tag } = req.body;
        const description = (req.body.description || req.body.discription).trim();
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        return res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
//route 3: update an existing note using: PUT "/api/notes/updatenote/:id" login required
router.put('/updatenote/:id', fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description')
        .custom((value, { req }) => {
            const description = typeof value === 'string' ? value : req.body.discription;
            return typeof description === 'string' && description.trim().length >= 5;
        })
        .withMessage('Enter a valid description')
],
 async (req, res) => {
    try{

        const { title, description, tag } = req.body; 
        const newNotes= {};
        if(title){newNotes.title=title};
        if(description){newNotes.description=description}
        if(tag){newNotes.tag=tag};
        let note = await Notes.findByIdAndUpdate(req.params.id);
        if(!note){return res.status(404).send("not found")};
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed");
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
        return res.json({note});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 }); 

//route 4: delete an existing note using: DELETE "/api/notes/deletenote/:id" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("not found")};
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed");
        }
        note=await Notes.findByIdAndDelete(req.params.id);
        return res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

module.exports = router;