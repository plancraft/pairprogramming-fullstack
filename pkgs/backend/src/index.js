import cors from 'cors'
import express from 'express'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

const todos = [
  { id: 1, title: 'Abschlagsrechnung fur Kunde Muller vorbereiten', completed: false },
  { id: 2, title: 'Ruckfrage zur Position 18 klaren', completed: false },
  { id: 3, title: 'Projektstatus fur dschulia aktualisieren', completed: true },
]

let nextTodoId = 4

app.get('/api/todos', (_req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const { title } = req.body

  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ message: 'title is required' })
    return
  }

  const newTodo = {
    id: nextTodoId,
    title: title.trim(),
    completed: false,
  }

  nextTodoId += 1
  todos.push(newTodo)

  res.status(201).json(newTodo)
})

app.listen(port, () => {
  console.log(`Todo API listening on http://localhost:${port}`)
})
