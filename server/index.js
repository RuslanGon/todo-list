import express, { json } from 'express'
import cors from 'cors'
import startServer from './db.js'
import TodoModel from './models/Todo.js'

const app = express()
app.use(cors({origin: ['http://localhost:5173'], credentials: true}))
app.use(express.json())


app.post('/add', async (req, res) => {
    const { task } = req.body;  
    try {
        const newTodo = await TodoModel.create({ task });
        res.status(201).json({
            message: 'Задача успешно добавлена!',
            todo: newTodo,
        });
    } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
});

app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find()
        res.status(200).json(todos);
    } catch (error) {
        console.error('Ошибка при получении задачи:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
})

startServer(app)