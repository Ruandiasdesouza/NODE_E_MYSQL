const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pages = req.body.pages

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pages', title, pages]

    pool.query(sql, data, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"
    pool.query(sql, function (err, data) {
        if(err) {
            console.log(err)
            return
        }

        const books = data
        console.log(books)
        res.render('books', {books})
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id]
    pool.query(sql, data, function (err, data) {
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render('book', {book})
    })
})
app.get('/books/edit/:id', (req, res) =>{
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id]

    pool.query(sql, data, function(err, data) {
        if(err) {
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', {book})
    })   
})
app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pages = req.body.pages

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
    const data = ['title', title, 'pages', pages, 'id', id]

    pool.query(sql, data, function(err) {
        if(err) {
            console.log(err)
            return
        }
        res.redirect('/books')
})
})

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM books WHERE ?? = ?`;
    const data = ['id', id]
    pool.query(sql, data, function(err) {
        if(err) {
            console.log(err)
            return
        }
        res.redirect('/books')
})
})
app.listen(3000, () => {
    console.log('Servidor Express iniciado na porta 3000')
})