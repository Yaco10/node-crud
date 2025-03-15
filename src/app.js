import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import playerRoutes from './routes/player.routes.js'
import bodyParser from 'body-parser' 
config()



const app = express()
app.use(bodyParser.json()) //parseador de body

//aca conectamos la base de datos
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection

app.use('/players', playerRoutes)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("server iniciado")
} )