const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const path = require('path')

app.use(express.static(__dirname + '/dist/OGND'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/OGND'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})