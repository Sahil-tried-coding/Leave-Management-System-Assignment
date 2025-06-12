

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

