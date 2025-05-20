const router = require("express").Router()

const apiRoutes = require("./api/index")

router.use("/api" , apiRoutes)

router.use("/api" , (req , res , next) => {
    next (
        console.log("The route u are trying not exist")   
    )
})

module.exports = router