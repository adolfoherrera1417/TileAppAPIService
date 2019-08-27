/* 
    Name: Mongoose
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 16, 2019
    Purpose: Using the mongoose mondule to make a connection to a MongoDB database
*/

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://adolfoherrera1417:Fitoyalex3mongodbatlas!@cluster0-emxum.mongodb.net/rodriguez-tile-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})