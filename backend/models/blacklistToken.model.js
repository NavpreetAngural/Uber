const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema ({
    token : {
        required : true,
        type : String , 
        unique : true
    },
    createdAt : {
        type : Date ,
        default : Date.now,
        expires : 86400
    }
})

module.exports = mongoose.model('BlacklistToken' , blacklistTokenSchema)