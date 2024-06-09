const express = require('express')
const app = express()
const port = process.env.PORT || 10000;
const path = require('path')

app.use(express.static(__dirname + '/dist/ognd'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/ognd'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})