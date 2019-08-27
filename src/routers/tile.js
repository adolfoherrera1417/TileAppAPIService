/* 
    Name: Tile Routes
    Created by: Adolfo Herrera
    Created on: July 6, 2019
    Last Updated: July 16, 2019
    Purpose: Serves as the routes to get,post,update for tile collection

    FIXME: Check that correct status codes for errors are sent
    FIXME: Allow only authenticated users to post
    FIXME: Allow for setting page limits and quantities to show
    FIXME: only send back required data dont send back object ID
*/
const express = require('express')
const Tile = require('../models/tile')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router

// Route to GET all the tiles currently in collection

//Pagination - Limit
//Pagination - Skip
//Pagination - Example URL = /tiles?limit=10&skip=10
router.get('/tiles', async (req,res) => {

    const match = {}
    const options = {}
    
    if (req.query.type) {
        match.type = req.query.type
    }

    options.limit = req.query.limit ? parseInt(req.query.limit) : null
    options.skip = req.query.skip ? parseInt(req.query.skip) : null

    try {

        const tiles = await Tile.find(match, {avatar:0, __v:0}, options)
        res.send(tiles)

    } catch (error) {
        res.status(400).send()
    }
})

// Will upload image to database
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a JPG file'))
        }
        cb(undefined,true)
    }
})

// Route to POST a new tile to collection
router.post('/tiles',upload.fields([{ name: 'avatar', maxCount: 1 }, {name: 'gallery', maxCount: 4 }]), async (req,res) => {
    
    const avatarBuffer = await sharp(req.files.avatar[0].buffer).resize({width: 150, height: 150}).png().toBuffer()

    const galleryBuffer = []
    for(let i = 0; i < req.files.gallery.length; i++) {
        galleryBuffer.push(await sharp(req.files.gallery[i].buffer).resize({height: 150}).png().toBuffer()) 
    }
   
    const properties = JSON.parse(req.body.state)
    
    properties['avatar'] = avatarBuffer
    properties['gallery'] = galleryBuffer

    const tile = new Tile(properties) 
    try {
         await tile.save()
         res.status(201).send(tile)
    } catch(error) {
        res.status(404).send({error:'Please verify inputs'})
    }
})


// Route to GET a specific tile by id
router.get('/tiles/:id', async (req,res) => {
    try {
        const tile = await Tile.findById(req.params.id)
        res.send(tile)
    } catch(error) {
        res.status(404).send(error)
    }
})

// Route to GET a tile image by tile id
router.get('/tiles/:id/avatar', async (req,res) => {
    try {
        const tile = await Tile.findById(req.params.id)
        if (!tile || !tile.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(tile.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/tiles/:id/gallery', async (req,res) => {
    try {
        const tile = await Tile.findById(req.params.id)
        if (!tile || !tile.gallery) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(tile.gallery)
    } catch (e) {
        res.status(404).send()
    }
})

// Route to PATH (update) a single tile. Pass in conditions as query
router.patch('/tiles', async (req,res) => {
    const conditions = req.query
    const updates = req.body
    try {
        const tile = await Tile.findOneAndUpdate(conditions,updates,{new:true})
        res.send(tile)
    } catch(error) {
        res.status(401).send()
    }
})

// Route to REMOVE a single tile. By ID
router.delete('/tiles/:id', async (req,res) => {
    try {
        const tile = await Tile.findByIdAndRemove(req.params.id)
        if (!tile) {
            throw new error('Failed to delete tile')
        }
        res.send(tile)
    } catch (error) {
        res.status(401).send()
    }
})

module.exports = router