const fs = require('fs')

const errorfun = async (err,req,res,next)=>{
    console.log('In err middleware')
    try {
    var emsg = new Date()+"\t"+req.method+"\t"+req.path+"\t"+err+"\n"
    await fs.appendFile('log.txt', emsg, (err)=>{
        if (err) {
            console.log(error)
            next()
        };
      });
    } catch (error) {
        console.log(error)
    }
    next()   
}

module.exports = errorfun