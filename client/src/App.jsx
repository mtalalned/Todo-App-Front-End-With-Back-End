import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const App = () => {
  
  const input = useRef()
  const [inputArray , setInputArray ] = useState([])

 useEffect (()=>{

  const fetchData = async () => {
    try {
      const response = await axios.get ('http://localhost:3000/todos')
      console.log (response.data.todo)
      setInputArray (response.data.todo)
    } catch {
      console.log ('error in fetching data')
    }
  }
  fetchData ()
 } , [])
 
 
  const AddTodo = async (event) => {
    event.preventDefault()
    try {
      const postRequest = await axios.post ('http://localhost:3000/todos' , {
        title: input.current.value
      })
      setInputArray([...inputArray , postRequest.data.todo])
    } catch {
      console.log ('error in adding todo')
    }
  }
  

  const deleteTodo = async (item , index) => {
    try {
      const deleteRequest = await axios.delete (`http://localhost:3000/todos/${item.id}`)
      inputArray.splice(index , 1)
      setInputArray([...inputArray])
    } catch {
      console.log ('error in delete request')
    }
  }

  const editTodo = async (item , index) =>{
    try {
      const editValue = prompt ('Enter update value')
      const editRequest = await axios.put(`http://localhost:3000/todos/${item.id}` , {
        title: editValue
      })
      console.log (editRequest.data.todo)
      inputArray[index].title = editRequest.data.todo
      setInputArray([...inputArray])
    } catch {
      console.log ('error in editing request')
    }
  }
  
  return (
    <div>
      <h1>TODO APP</h1>
      <form onSubmit={(event) => AddTodo(event)}>
        <input type="text" ref={input}/>
        <button type='submit'>Add Todo</button>
      </form>
      <ul>
        {inputArray.map ((item , index)=> {
          return <li key={item.id}>{item.title}
          <button onClick={()=> deleteTodo (item , index)}>Delete</button>
          <button onClick={()=> editTodo (item , index)}>Edit</button>
          </li>
        })}
      </ul>
    </div>
  )
}

export default App
