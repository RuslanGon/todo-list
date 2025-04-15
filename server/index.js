import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import startServer from './db.js'

const app = express()
app.use(cors({origin: ['http://localhost:5173'], credentials: true}))
app.use(express.json())


app.post('/add', async (req, res) => {
    const task = req.body.task
})

startServer(app)