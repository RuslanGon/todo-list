import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(cors({origin: ['http://localhost:5173'], credentials: true}))
app.use(express.json())

mongoose.connect()

app.post('/add', async (req, res) => {
    const task = req.body.task
})

app.listen(3001, () => {
    console.log('Server is Running');
})