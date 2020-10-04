require('../db/mongoose')
const User = require('../models/User')
const Task = require('../models/Task')

// User.UserModel.findOneAndUpdate("5f72ef781d1f190a58d8d424",{$inc:{age:10}}).then((user)=>{
//     console.log(user)
//     return User.UserModel.countDocuments({age:31})
// }).then((res)=>{
// console.log(res)
// }).catch((e)=>{
//     console.log(e)
// })




Task.TaskModel.findByIdAndDelete("5f72b97f4e101c5cccddd22f").then((task)=>{
    console.log(task)
    return Task.TaskModel.countDocuments({completed:false})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})