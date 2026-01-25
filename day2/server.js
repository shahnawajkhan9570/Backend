const express = require('express')

const app = express() // server instance create karna

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('about page')
})

app.get('/home', (req, res) => {
  res.send('home page')
})
app.get('/page', (req, res) => {
  res.send('page open')
})
app.get('/result', (req, res) => {
  res.send('result open')
})

app.listen(3000, ()=>{
  console.log('serverr started on port 3000')
}) //server strat karna 