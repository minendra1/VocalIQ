import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js"
dotenv.config()


const app=express()

const PORT=8000

app.get("/",(req,res)=>{
    res.json("Hello from server")
})

app.listen(PORT,()=>{
    console.log(` Server started on Port ${PORT}`)
    connectDB()
})