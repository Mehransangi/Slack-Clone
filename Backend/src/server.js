import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest"
import { serverless } from "serverless-http"
const app = express()
app.use(clerkMiddleware()) // req.auth
app.use(express.json()); // req.body

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
    res.send(" <h1> Hello Suckers </h1>");
})

await connectDB()

export const handler = serverless(app);