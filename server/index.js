// const express = require('express')
import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
app.use (express.json())

const todoArr = []

app.get ('/todos' , (req , res)=> {
    res.json ({
        todo: todoArr
    })
})

app.post('/todos', (req, res) => {
    const title = req.body.title
    if (!title) return res.status(404).json({
        message: "title is required"
    })
    const object = {
        title,
        id: Date.now()
    }
    todoArr.push (object)
    res.json({
        message: 'Todo Added Successfully',
        todo: object
    })
})

app.put ('/todos/:id' , (req , res)=> {
    const title = req.body.title
    const {id} = req.params

    if (!title) return res.status(404).json({
        message: "updated title is required"
    })

    const index = todoArr.findIndex ((item) => item.id === +id)

    if (index === -1) return res.json({
        message: 'todo not found'
    })

    todoArr[index].title = title

    res.json ({
        message: 'todo updated successfully',
        todo: title
    })
})


app.delete ('/todos/:id' , (req , res)=> {
    const {id} = req.params

    const index = todoArr.findIndex ((item) => item.id === +id) 

    if (index === -1) return res.json({
        message: "todo not found"
    })

    todoArr.splice (index , 1)

    res.json ({
        message: 'todo deleted successfully'
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
