import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

const [notes,setNotes]=useState(()=>{
const saved=localStorage.getItem("notes")
return saved?JSON.parse(saved):[]
})

const [text,setText]=useState("")
const [search,setSearch]=useState("")
const [darkMode,setDarkMode]=useState(false)
const [editingId,setEditingId]=useState(null)

useEffect(()=>{
localStorage.setItem("notes",JSON.stringify(notes))
},[notes])

const addNote=()=>{
if(text.trim()==="") return

const newNote={
id:Date.now(),
text:text,
date:new Date().toLocaleString(),
color:getRandomColor()
}

setNotes([...notes,newNote])
setText("")
}

const deleteNote=(id)=>{
setNotes(notes.filter(note=>note.id!==id))
}

const startEdit=(id,text)=>{
setEditingId(id)
setText(text)
}

const saveEdit=()=>{
setNotes(notes.map(note=>{
if(note.id===editingId){
return {...note,text:text}
}
return note
}))
setEditingId(null)
setText("")
}

const getRandomColor=()=>{
const colors=[
"#fff176",
"#aed581",
"#81d4fa",
"#ffab91",
"#ce93d8"
]
return colors[Math.floor(Math.random()*colors.length)]
}

const filteredNotes=notes.filter(note=>
note.text.toLowerCase().includes(search.toLowerCase())
)

return(

<div className={darkMode?"dark app":"app"}>

<h1>My Notes App</h1>

<button onClick={()=>setDarkMode(!darkMode)}>
Toggle Dark Mode
</button>

<br/><br/>

<input
placeholder="Search notes"
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search"
/>

<br/><br/>

<input
placeholder="Write a note..."
value={text}
onChange={(e)=>setText(e.target.value)}
className="note-input"
/>

<button
onClick={editingId?saveEdit:addNote}
className="add-btn"
>
{editingId?"Save Edit":"Add Note"}
</button>

<div className="notes-container">

{filteredNotes.map(note=>(

<div
key={note.id}
className="note-card"
style={{background:note.color}}
>

<p>{note.text}</p>

<small>{note.date}</small>

<div className="note-buttons">

<button
onClick={()=>startEdit(note.id,note.text)}
className="edit-btn"
>
Edit
</button>

<button
onClick={()=>deleteNote(note.id)}
className="delete-btn"
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

)
}

export default App