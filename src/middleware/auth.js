module.exports = (req, res, next) => {
    // Role id is as following 
        // role_id = 1 : employee
        // role_id = 2 : Hr
        // role_id = 3 : Manager
        // role_id = 4 : Tech Lead

  req.employee = {
      id:1003,
      name:"employee sahil",
      role_id:3
  };

//   req.employee = {
//     id: 1107,
//     name: "Hr",
//     role_id: 2, 
//   };

//   req.employee = {
//     id: 1106,
//     name: "manager",
//     role_id: 3, 
//   };

//   req.employee = {
//     id: 1206,
//     name: "Tech lead",
//     role_id: 4, 
//   };

  next();
};
