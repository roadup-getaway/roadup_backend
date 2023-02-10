const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/roads', (req, res) => {

  fs.readFile('roads.json', (err, data)=> {
    const roads = JSON.parse(data)

    console.log(
      roads
    )
    res.json(roads)
  }) 

  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})