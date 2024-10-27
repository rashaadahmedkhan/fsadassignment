const express = require('express')
const router = express.Router()
const Book = require('../models/bookCollection')

// search for book 
router.get('/api/books/search', async(req,res) => {
    const {title, genre, author, condition, availability} = req.query
    try {
        const filter = {}

        if(title) {
            filter.title = {$regex: title, $options: 'i'}
        }
        if(genre) {
            filter.genre = {$regex: genre, $options: 'i'}
        }
        if(author) {
            filter.author = {$regex: author, $options: 'i'}
        }
        if(condition) {
            filter.condition = {$regex: condition, $options: 'i'}
        }
        if(availability) {
            filter.availability = {$regex: availability, $options: 'i'}
        }

        const book = await Book.find(filter)
        res.json(book)
    } catch(error) {
        res.sendStatus(500).json({message: error.message})
    }
})

// get all books
router.get('/api/books', async(req,res) => {
    try {
        const book = await Book.find({})
        res.status(200).json(book)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// get book by id
router.get('/api/books/:id', async(req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// update book
router.put('/api/books/:id', async(req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id, req.body)
        if(!book) {
            return res.status(404).json({message: `cannot find book with id ${id}`})
        }
        res.sendStatus(200).json(book)
    } catch(error) {
        console.log(error.message)
        res.sendStatus(500).json({message: error.message})
    }
})

// add books
router.post('/api/books', async(req,res) => {
    try{
        const book = await Book.create(req.body)
        res.status(200).json(book)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// delete a book
router.delete('/api/books/:id', async(req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)
        if(!book) {
            return res.status(404).json({message: `cannot find book with id ${id}`})
        }
        res.status(200).json(book)
    } catch(error) {
        res.sendStatus(500).json({message: error.message})
    }
})

module.exports = router