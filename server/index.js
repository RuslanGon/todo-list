import express, { json } from 'express'
import cors from 'cors'
import startServer from './db.js'
import TodoModel from './models/Todo.js'

const app = express()
app.use(cors({origin: ['http://localhost:5173', 'https://todo-list-nine-ebon-85.vercel.app/'], credentials: true}))
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

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedTask = await TodoModel.findByIdAndUpdate(
            { _id: id }, 
            { done: true }, 
            { new: true } 
        );
        res.json(updatedTask); 
    } catch (error) {
        console.error('Ошибка при редактировании задачи:', error);
        res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await TodoModel.findByIdAndDelete(id);
      res.json({ message: 'Задача удалена успешно', id: deletedTask._id });
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

startServer(app)