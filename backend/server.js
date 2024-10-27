const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')
const Book = require('./models/bookCollection')
const User = require('./models/User')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set('view engine', 'ejs')

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your React app's URL
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // Allow credentials (if needed)
  };
  
  app.use(cors(corsOptions));

// search for book 
app.get('/api/books/search', async(req,res) => {
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
app.get('/api/books', async(req,res) => {
    try {
        const book = await Book.find({})
        res.status(200).json(book)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// get book by id
app.get('/api/books/:id', async(req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// update book
app.put('/api/books/:id', async(req,res) => {
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
app.post('/api/books', async(req,res) => {
    try{
        const book = await Book.create(req.body)
        res.status(200).json(book)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// delete a book
app.delete('/api/books/:id', async(req,res) => {
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

// auth

// signup get
app.get('/api/auth/signup', (req,res) => {
    try {
        res.status(200).json(res)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// signup post
app.post('/api/auth/signup', async(req,res) => {
    const {email, password} = req.body
    try {
        console.log('signup request', req.body)
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ message: 'user created successfully!', user});
    } catch(error) {
        console.log(error.message)
        res.status(400).json({message: error.message})
    }
})

// login get
app.get('/api/auth/login', (req,res) => {
    try {
        res.status(200).json(res.body)
    } catch(error) {
        res.sendStatus(500).json({message: error.message}).lean()
    }
})

// login post
app.post('/api/auth/login', (req,res) => {
    try {
        const {email, password} = req.body
        console.log(email, password)
        res.status(200).json({ message: 'Login successful', email });
    } catch(error) {
        res.sendStatus(500).json({message: error.message}).lean()
    }
})

// cookies
app.get('/set-cookies', (req,res) => {
    res.cookie('newUser', false)
    res.send('you got cookies!!!')
})

app.get('/read-cookies', (req,res) => {
    const cookies = req.cookies
    console.log(cookies.newUser)
    res.json(cookies)
})

//token

/**
 * days: 3
 * hours: 24
 * minutes: 60
 * seconds: 60
 */
const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id}, 'payload-secret', {
        expiresIn: maxAge
    })
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to mongodb!!!')
    app.listen(3001, () => {
        console.log(`server running on port 3001`)
    })
}).catch((error) => {
    console.log(error)
})