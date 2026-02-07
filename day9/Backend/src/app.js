// server ko create karna

const express = require('express')
const noteModel = require('./models/note.model')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

//post/api/notes
//create new note and save data in mogodb
//req.body = {title, description}
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    
    const note = await noteModel.create({ title, description });
    res.status(201).json({
        message: 'note created successfully',
        note: note
    });

});

//get/api/notes
//fetch all the notes data from mongodb and send them in the response   
    app.get('/api/notes', async (req, res) => {
        const notes = await noteModel.find();

        res.status(200).json({
            message: 'notes fetched successfully',
            notes:notes
        });
});

// delete/api/notes/:id
//delete note with the id from request.params
app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: 'note deleted successfully',
        
    });
});

//patch/api/notes/:id
//update the description of the note by id
//req.body = {description}
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description }, { new: true });

    

    res.status(200).json({
        message: 'note updated successfully',
        
    });
});

console.log(__dirname)
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});


module.exports = app