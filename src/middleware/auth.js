module.exports = (req,res,next) =>{

    req.employee = {
        id:4,
        name:"sahil",
        role_id:2
    };

    next()

}