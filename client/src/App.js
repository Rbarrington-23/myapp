import React,{useState,useEffect} from "react"
import axios from "axios"
import "./App.css"

function App(){

const[username,setUsername]=useState("")
const[password,setPassword]=useState("")
const[user,setUser]=useState(null)

const[note,setNote]=useState("")
const[notes,setNotes]=useState([])
const[search,setSearch]=useState("")
const[dark,setDark]=useState(false)

const register=()=>{

axios.post("http://localhost:5000/register",{
username,
password
}).then(()=>alert("Registered"))

}

const login=()=>{

axios.post("http://localhost:5000/login",{
username,
password
}).then(res=>{

if(res.data.success){
setUser(username)
loadNotes(username)
}else{
alert("Invalid login")
}

})

}

const loadNotes=(u)=>{

axios.get(`http://localhost:5000/notes/${u}`)
.then(res=>setNotes(res.data))

}

const addNote=()=>{

axios.post("http://localhost:5000/addNote",{
username:user,
text:note
}).then(()=>{
setNote("")
loadNotes(user)
})

}

const deleteNote=(id)=>{

axios.delete(`http://localhost:5000/deleteNote/${id}`)
.then(()=>loadNotes(user))

}

const updateNote=(id,text)=>{

const newText=prompt("Edit note",text)

axios.put("http://localhost:5000/updateNote",{
id,
text:newText
}).then(()=>loadNotes(user))

}

const filteredNotes=notes.filter(n=>
n.text.toLowerCase().includes(search.toLowerCase())
)

if(!user){

return(

<div className="login">

<h2>Login</h2>

<input placeholder="Username"
onChange={e=>setUsername(e.target.value)} />

<input placeholder="Password"
type="password"
onChange={e=>setPassword(e.target.value)} />

<button onClick={login}>Login</button>
<button onClick={register}>Register</button>

</div>

)

}

return(

<div className={dark?"dark":"app"}>

<h1>My Notes App</h1>

<button onClick={()=>setDark(!dark)}>
Toggle Dark Mode
</button>

<input
placeholder="Search notes"
onChange={e=>setSearch(e.target.value)}
/>

<div className="add">

<input
placeholder="Write a note..."
value={note}
onChange={e=>setNote(e.target.value)}
/>

<button onClick={addNote}>Add Note</button>

</div>

<div className="notes">

{filteredNotes.map(n=>(

<div key={n.id} className="card">

<p>{n.text}</p>

<button
className="edit"
onClick={()=>updateNote(n.id,n.text)}
>
Edit
</button>

<button
className="delete"
onClick={()=>deleteNote(n.id)}
>
Delete
</button>

</div>

))}

</div>

</div>

)

}

export default App