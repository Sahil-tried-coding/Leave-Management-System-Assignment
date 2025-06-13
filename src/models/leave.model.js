const db = require('../config/db');

// ✅ Create New Leave Entry
exports.createLeaves = async (LeaveData) => {
  const {
    employee_id,
    role_id,
    leave_type,
    start_date,
    end_date,
    reason,
    created_by,
  } = LeaveData;

  const [result] = await db.query(
    `INSERT INTO Leaves
     (employee_id, role_id, leave_type, start_date, end_date, reason, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [employee_id, role_id, leave_type, start_date, end_date, reason, created_by]
  );

  return result.insertId;
};

// ✅ Get Leaves with any SQL
exports.fetchLeaves = async (query, params) => {
  return await db.query(query, params);
};

// ✅ Update Leave Status
exports.updateLeaveStatus = async (id, newStatus, updatedBy, comment) => {
  const [existing] = await db.query(`SELECT status FROM Leaves WHERE id = ?`, [id]);

  if (!existing.length) throw new Error('Leave not found');

  const currentStatus = existing[0].status;

  if (currentStatus === 'approved' || currentStatus === 'rejected') {
    throw new Error('Leave is already finalized and cannot be changed');
  }

  await db.query(
    `UPDATE Leaves
     SET status = ?, comment = ?, updated_by = ?, updated_at = NOW()
     WHERE id = ?`,
    [newStatus, comment, updatedBy, id]
  );

  return true;
};
