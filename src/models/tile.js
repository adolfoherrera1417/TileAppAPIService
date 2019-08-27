/* 
    Name: Tile Model
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 16, 2019
    Purpose: File represents the schema for Tiles data being stored in MongoDB

    //TODO: Will require to add values dynamically
    //TODO: Add location of which store the tile is located
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String
        },
        other: [String],
        placement: [String],
        finish: [String],
        properties: [String],
        length: Number,
        width: Number,
        avatar: {
            type: Buffer,
            contentType: String
        },
        gallery: [Buffer]
    }
)

const Tile = mongoose.model('Tile',tileSchema)
module.exports = Tile