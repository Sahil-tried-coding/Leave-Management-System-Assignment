

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