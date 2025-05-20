const { mongoose , model} = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First Name should be atleast 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last Name should be atleast 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'email must be atleast 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
})

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.SECRET)
//     return token
// }

// userSchema.methods.hashPassword = async function (password) {
//     return await bcrypt.hash(password, 10)
// }

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }

module.exports = model("User", userSchema)