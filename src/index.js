const express = require('express')
const app = express()
app.use(express.json())
require('./db/mongoose')
const jwt = require('jsonwebtoken')
const UserRouter = require('./routes/userroute')
const TaskRouter = require('./routes/taskroutes')
const errorfun = require('./middleware/error')

const port = process.env.PORT
app.use(errorfun)
app.use(UserRouter)
app.use(TaskRouter)
app.get("*",async(req,res)=>{
    res.status(404).send({error:"Url Not Found"})
})

app.post("*",async(req,res)=>{
    res.status(404).send({error:"Url Not Found"})
})

app.patch("*",async(req,res)=>{
    res.status(404).send({error:"Url Not Found"})
})

app.delete("*",async(req,res)=>{
    res.status(404).send({error:"Url Not Found"})
})

app.listen(port,async ()=>{
    try {
    await console.log("server is up at port : "+port)   
    } catch (error) {
        
    console.log("Error while starting the server"+error)
    }

})


// const Task = require('./models/Task')
// const User = require('./models/User')
// const main = async ()=>{
// // const task = await Task.findById('5f760bcf1167b7752c656102')
// // await task.populate('owner').execPopulate()
// // console.log(task.owner)

// const user = await User.findById('5f760ff0d677ce04acaa0c1f')
// await user.populate('tasks').execPopulate()
// console.log(user,user.tasks)
// }
// main()
// app.use((req,res,next)=>{
//     res.status(503).send({msg:'Site under maintenance'})
// })

// app.use((req,res,next)=>{

//     if(req.method==='GET'){
//         res.send('GET REQUESTS ARE CURRENTLY DISABLED')
//     }else{
//         next()
//     }

// })
// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,callback){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return callback('Please upload a doc/docx file only',undefined)
//         }
//         callback(undefined,true)
//     }
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// }),(error,req,res,next)=>{
//     res.status(500).send({error})
// }