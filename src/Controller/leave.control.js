const Leavemodel = require("../models/leave.model");

exports.applyLeave = async (req,res) => {


    const { leave_type, start_date, end_date, reason, role_id } = req.body;
    
    const { id: employee_id, role_id: auth_role_id } = req.employee;
    
    if (!req.body) {
    return res.status(400).json({ success: false, error: 'No body sent' });
  }
  console.log("this is the request  body",req.body)

  if (!leave_type || !start_date || !end_date || !reason || !role_id) {
    return res
      .status(400)
      .json({ sucess: "false", error: "All fields are required" });
  }

  if (new Date(start_date) > Date(end_date)) {
    return res
      .status(400)
      .json({ sucess: false, error: "Start date must be before end date" });
  }

  if (role_id !== auth_role_id) {
    return res
      .status(403)
      .json({ sucess: false, error: "Role mismatch with logged-in user" });
  }

  try {
    const newId = await Leavemodel.createLeaves({
      employee_id,
      role_id,
      leave_type,
      start_date,
      end_date,
      reason,
      created_by: employee_id,
    });

    res.status(201).json({
      sucess: true,
      data: {
        id: newId,
        employee_id,
        role_id,
        leave_type,
        start_date,
        end_date,
        status: "pending",
        created_by: employee_id,
        reason,
    
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ sucess: false, error: "Database error" });
  }
};

exports.getLeavesByStatus = async(req,res) =>{

    const {status} = req.query;

    const  {id:employee_id,role_id} = req.employee;

    if(!status){
        res.status(401).json({success:false,message:"Status is required"})
    }

    try {
        
         const leaves = await Leavemodel.getLeavesByStatus(status,employee_id,role_id)

         res.status(201).json({success:true,data:leaves})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error})
    }
}