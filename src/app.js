/* 
    Name: app.js
    Created by: Adolfo Herrera
    Created on: August 26, 2019
    Last Updated: August 26, 2019
    Purpose: Serves as the entry point to the rest of the API. 
*/

const express = require('express')
require('./db/mongoose')

const tileRouter = require('./routers/tile')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(tileRouter)

app.get('/',(req,res) => res.send('Tile App RESTful API endpoints access'))

app.listen(port, () => console.log(`Tile RESTful API Endpoints started on port: ${port}!`))