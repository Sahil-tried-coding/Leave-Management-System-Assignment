

const db = require("../config/db")


exports.createLeaves = async (LeaveData) =>{

    const {
        employee_id,
        role_id,
        leave_type,
        start_date,
        end_date,
        reason,
        created_by
    } = LeaveData;

    const [result] = await db.query(
        `insert into Leaves
        (employee_id,role_id,leave_type,start_date,end_date,reason,created_by)
        values (?,?,?,?,?,?,?)`,
        [employee_id,role_id,leave_type,start_date,end_date,reason,created_by]
    );

    return result.insertId
}

exports.getLeavesByStatus = async (status,role_id,employee_id) =>{
    if(role_id === 1){

        const [rows] = await db.query(
            `select * from Leaves where status = ? and employee_id = ? `,
            [status,employee_id]
        )
        return rows
    }
    else {
        const [rows] = db.query(
            `select * from Leaves where status = ?`,
            [status]
        );
        return rows
    }
}


exports.updateLeaveStatus = async(id,newStatus,updatedBy,comment)=>{

    const [existing] = await db.query(
        `select status from Leaves where id = ?`,[id]
    )

    if(!existing.length) throw new Error("Leave not found");
    const currentStatus = existing[0].status;

    if(currentStatus === "approved" || currentStatus === "rejected"){
        throw new Error("Leave is already finalized and cannot be changed")
    }

    await db.query(
        `update Leaves
        set status = ?,comment = ?,updated_by = ?, updated_at = now()
        where id = ?`,[newStatus,comment,updatedBy,id]

    ) 
    return true;
}