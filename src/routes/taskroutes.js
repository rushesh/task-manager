const express = require('express')
const taskRouter = new express.Router()
const Task = require('../models/Task')
const auth = require('../middleware/auth')
// taskRouter.get("/task",(req,res)=>{
//     Task.findAllTask().then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
// })

//GET /task?completed=true
//GET /task?limit=10&skip=0
//GET /task?sortBy=createdAt_desc
//GET /task?sortBy=createdAt:desc
//GET /task?sortBy=createdAt_asc
//1 asc -1 desc
taskRouter.get("/task",auth,async (req,res)=>{
    try {
    //const result = await Task.find({owner:req.user._id})
    //await req.user.populate('tasks').execPopulate()
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }
    await req.user.populate({
        path:'tasks',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip)
        },
        sort
    }).execPopulate()
        res.send(req.user.tasks)   
    } catch (error) {
        res.status(400).send({error:error})
    }
})

//If a 12 length is passed which matches id it gives task not found
//If a improperly formatted is passed it gives error
// taskRouter.get("/task/:id",(req,res)=>{
//     const id = req.params.id
//     Task.findById(id).then((result)=>{
//         console.log("result : "+result)
//         if(!result){
//             res.status(404).send('Task not found')
//         }else{
//             res.send(result)
//         }
//     }).catch((err)=>{
//         res.status(400).send("Bad Request")
//     })
// })

taskRouter.get("/task/:id",auth,async (req,res)=>{
    try {
    const _id = req.params.id
    
    //const result = await Task.findById(id)
    const result = await Task.findOne({_id,owner:req.user._id})
        if(!result){
            res.status(404).send('Task not found')
        }else{
            res.send(result)
        }   
    } catch (error) {
        res.status(400).send("Bad Request")
    }   
})

// taskRouter.post("/task",(req,res)=>{
//     const task = new Task(req.body)
//     task.save().then((result)=>{
//         res.status(201).send(result)
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
// })

taskRouter.post("/task", auth,async (req,res)=>{
    try {
        //const task = new Task(req.body)
        const task = new Task({
            ...req.body,
            owner:req.user._id
        })
        const result = await task.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

taskRouter.patch('/task/:id',auth,async (req,res)=>{
    try {
        if(Object.keys(req.body).length===0){
            return res.status(404).send({error:'No property to update!'})
        }
        const allowedUpdates = ['description','completed']
        const taskUpdates = Object.keys(req.body)
    
        const isValidOperation =  taskUpdates.every((update)=>{
            return allowedUpdates.includes(update)
        })
    
        if(!isValidOperation){
            return res.status(400).send({error:'Not allowed property'})
        }

        //var task = await Task.findById(req.params.id)
        var task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        taskUpdates.forEach(field => {
            task[field]=req.body[field]
        })
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            res.status(404).send("no such note found")
        }
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

taskRouter.delete('/task/:id',auth,async (req,res)=>{
    try {     
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if(!task){
        res.status(404).send({error:`No task with id ${req.params.id} found`})
    }
        res.send({task,user:req.user})   
    } catch (error) {
        res.status(500).send({error:"Error while deleting"})
    }
})

module.exports = taskRouter