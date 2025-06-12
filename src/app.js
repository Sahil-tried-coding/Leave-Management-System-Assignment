const express = require("express")

const app = express()

const leaveRoute = require("./routes/leave.routes")

app.use(express.json())

app.use("/api/leaves",leaveRoute)

app.use((req,res) => {
    res.status(404).json({message:"Not Found",sucess:false})
})

module.exports = app