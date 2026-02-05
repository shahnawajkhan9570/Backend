// server ko create karna


const express = require('express')
const noteModel = require('./models/notes.model')

const app = express()

app.use(express.json())
//post/notes
//req.body => {title:'', description:''}

app.post('/notes', async (req, res)=>{
    // console.log(req.body)
    const {title, description} = req.body

    const newNote = await noteModel.create({title, description})

    res.status(201).json({
        message: 'note created successfully',
        note: newNote
    })
})



module.exports = app