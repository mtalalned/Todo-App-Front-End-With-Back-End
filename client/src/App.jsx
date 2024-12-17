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
      input.current.value = ''
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
    <div className='p-10 flex flex-col justify-center items-center gap-10'>
      <h1 className='text-center text-5xl font-bold'>TODO APP</h1>
      <form onSubmit={(event) => AddTodo(event)} className='flex gap-5 w-[450px]'>
        <input type="text" ref={input} placeholder="Enter text here" style={{backgroundColor: '#ffffff'}} className="min-w-[300px] w-[350px] p-2 border rounded-md bg-slate-500 text-gray-700 focus:ring-2 focus:ring-slate-400 transition duration-300 ease-in-out"/>
        <button type='submit' className="w-[175px] py-2 rounded-md bg-purple-700 font-semibold text-white hover:bg-purple-500 transition duration-300 ease-in-out">Add Todo</button>
      </form>
      <ul className='flex flex-col'>
        {inputArray && inputArray.map ((item , index)=> {
          return <div className='flex justify-between items-center gap-5 border-b border-b-2 py-3 w-[450px]'>
          <p className='text-center w-[50px]'>{index+1}</p>
          <p className='text-start w-[250px] break-all'>{item.title}</p>
          <div className='flex gap-2 w-[150px]'>
            <button className="bg-red-400 rounded-md text-white py-1 w-[100px] hover:bg-red-500 transition duration-300 ease-in-out font-semibold" onClick={()=> deleteTodo (item , index)}>Delete</button>
            <button className="bg-green-400 rounded-md text-white py-1 w-[100px] hover:bg-green-500 transition duration-300 ease-in-out font-semibold" onClick={()=> editTodo (item , index)}>Edit</button>
          </div>
        </div>
        })}
      </ul>
    </div>
  )
}

export default App
