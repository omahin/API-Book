const express = require('express')
const router = express.Router()
const cors = require('cors')

const books = []

const app = express()

app.use(express.json())
app.use(cors())

//rotas

//GET => Fornecer dados para o front end
const getBooks = router.get('/books', (req,res) => {
    res.status(200).json(books)
})

//POST => criar um dado
const createBook = router.post('/books', (req,res) => {
    const book = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    books.push(book)
    res.status(201).json({ message: `${book.title} criado com sucesso!`})
})

//DELETE => deletar um dado
const deleteBook = router.delete('/books/:id', (req, res) => {
    const { id } = req.params

    // Encontrando o índice do livro no array pelo ID
    const bookIndex = books.findIndex(book => book.id === parseInt(id))

    if (bookIndex !== -1) {
        // Removendo o livro do array
        const deletedBook = books.splice(bookIndex, 1)
        res.status(200).json({ message: `${deletedBook[0].title} deletado com sucesso!` })
    } else {
        res.status(404).json({ message: 'Livro não encontrado!' })
    }
})

app.use(getBooks)
app.use(createBook)
app.use(deleteBook)

app.listen(3333, console.log('Servidor rodando com sucesso'))