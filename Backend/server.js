import express from 'express'
import { ENV } from './env.js';

const app = express()

const port = ENV.PORT;

app.get("/", (req,res)=>{
    res.send("Hello")
})

app.listen(port, ()=> console.log(`http://localhost:${port}/`))