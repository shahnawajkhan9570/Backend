//- server ko create karna
//- server ko config karna 

const express = require("express")

const app = express() // jaise express ko call karte ho server create ho jata hai,

app.use(express.json())

const notes = []


app.post("/notes",(req,res)=>{
    console.log(req.body)

    notes.push(req.body)
    console.log(notes)

    res.send("note created")
})

//get /notes
app.get("/notes", (req, res) => {
    res.send(notes)
})

// delete /notes
// params
// delete /notes/0
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("note deleted")
})

//patch /notes/:index
//req.body = {description:"sample modified description"}

app.patch("/notes/:index",(req,res)=>{
    console.log(req.body)
    notes[req.params.index].description = req.body.description
    res.send("note updated")
})


module.exports = app