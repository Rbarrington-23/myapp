const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const db = new sqlite3.Database("./database.db")

db.serialize(() => {

db.run(`
CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
password TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS notes(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
note TEXT
)
`)

})

app.post("/register",(req,res)=>{

const {username,password} = req.body

db.run(
"INSERT INTO users(username,password) VALUES (?,?)",
[username,password],
(err)=>{
if(err){
res.json({success:false})
}else{
res.json({success:true})
}
}
)

})

app.post("/login",(req,res)=>{

const {username,password} = req.body

db.get(
"SELECT * FROM users WHERE username=? AND password=?",
[username,password],
(err,row)=>{
if(row){
res.json({success:true})
}else{
res.json({success:false})
}
}
)

})

app.post("/addNote",(req,res)=>{

const {username,note} = req.body

db.run(
"INSERT INTO notes(username,note) VALUES (?,?)",
[username,note],
()=>{
res.json({success:true})
}
)

})

app.get("/notes/:username",(req,res)=>{

db.all(
"SELECT * FROM notes WHERE username=?",
[req.params.username],
(err,rows)=>{
res.json(rows)
}
)

})

app.listen(5000,()=>{
console.log("Server running on http://localhost:5000")
})