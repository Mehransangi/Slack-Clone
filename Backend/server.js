import express from 'express'
import { ENV } from './src/config/env.js';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './src/config/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest"

const app = express()
app.use(clerkMiddleware()) // req.auth
app.use(express.json()); // req.body

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
    res.send(" <h1> Hello Suckers </h1>");
})

const startServer = async () => {
    try {
        await connectDB()
        if (ENV.NODE_ENV !== "production") {
            const port = ENV.PORT;
            app.listen(port, () => console.log(`http://localhost:${port}/`))
        }
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
startServer()

export default app