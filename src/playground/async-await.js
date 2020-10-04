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


// const findUpdateCount = async (id,age)=>{
//     const user = await User.UserModel.findOneAndUpdate(id,{$inc:{age:10}})
//     const countu = await User.UserModel.countDocuments()
//     return {
//         user:user,
//         count:countu
//     }
// }

// findUpdateCount("5f72b97f4e101c5cccddd22f",-51).then((u)=>{
//     console.log(u)
// }).catch((e)=>{
//     console.log(e)
// })

// Task.TaskModel.findByIdAndDelete("5f72b97f4e101c5cccddd22f").then((task)=>{
//     console.log(task)
//     return Task.TaskModel.countDocuments({completed:false})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const delCount = async (id)=>{
    const count1 =await Task.TaskModel.countDocuments({completed:false})
    const user = await Task.TaskModel.findByIdAndDelete(id)
    const count2 = await Task.TaskModel.countDocuments({completed:false})

    return {count1:count1,user:user,count2:count2}
}

delCount("5f72b9aa8c928d514c1d30dc").then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})