const Joi = require("joi");

const registerValidation = Joi.object({
    fullname: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required()
    }).required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

const loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const captainRegisterValidation = Joi.object({
    fullname: Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required()
    }).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
    status: Joi.string().valid('active', 'inactive').optional(),
    vehicle: Joi.object({
        color: Joi.string().min(3).required(),
        plate: Joi.string().min(3).required(),
        capacity: Joi.string().min(1).required(),
        vehicleType: Joi.string().valid('car', 'motorcycle', 'auto').required()
    }).required(),
    location: Joi.object({
        lat: Joi.number().optional(),
        long: Joi.number().optional()
    }).optional()
});

const captainLoginValidation = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required()
})


module.exports = { registerValidation, loginValidation, captainRegisterValidation , captainLoginValidation };
