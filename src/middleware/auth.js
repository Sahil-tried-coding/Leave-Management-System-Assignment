module.exports = (req,res,next) =>{

    req.employee = {
        id:1,
        name:"sahil",
        role_id:1
    };

    next()

}