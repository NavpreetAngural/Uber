const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First Name should be at least 3 characters long']
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last Name should be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color should be at least 3 characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate should be at least 3 characters']
        },
        capacity: {
            type: String,
            required: true,
            minlength: [1, 'Capacity is required']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        long: {
            type: Number
        }
    }
})

module.exports = mongoose.model('Captain', captainSchema);
