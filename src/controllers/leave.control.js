const Leavemodel = require('../models/leave.model');

// ✅ Apply Leave
exports.applyLeave = async (req, res) => {
  const { leave_type, start_date, end_date, reason, role_id } = req.body;
  const { id: employee_id, role_id: auth_role_id } = req.employee;

  if (!leave_type || !start_date || !end_date || !reason || !role_id) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  if (new Date(start_date) > new Date(end_date)) {
    return res.status(400).json({ success: false, error: 'Start date must be before end date' });
  }

  if (role_id !== auth_role_id) {
    return res.status(403).json({ success: false, error: 'Role mismatch with logged-in user' });
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
      success: true,
      data: {
        id: newId,
        employee_id,
        role_id,
        leave_type,
        start_date,
        end_date,
        status: 'pending',
        created_by: employee_id,
        reason,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Apply Leave Error:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
};

// ✅ Get Leaves Based on Role
exports.getLeavesByStatus = async (req, res) => {
  const { status } = req.query;
  const { id: employee_id, role_id } = req.employee;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  try {
    let query = '';
    let params = [];

    switch (Number(role_id)) {
      case 1:
        query = `SELECT * FROM Leaves WHERE status = ? AND employee_id = ?`;
        params = [status, employee_id];
        break;
      case 2:
        query = `SELECT * FROM Leaves WHERE status = ? AND role_id IN (1, 3)`;
        params = [status];
        break;
      case 3:
        query = `SELECT * FROM Leaves WHERE status = ? AND role_id IN (1, 2, 4)`;
        params = [status];
        break;
      case 4:
        query = `SELECT * FROM Leaves WHERE status = ? AND role_id = 1`;
        params = [status];
        break;
      default:
        throw new Error(`❌ Invalid role ID: ${role_id}`);
    }

    const [rows] = await Leavemodel.fetchLeaves(query, params);
    res.status(200).json({ success: true, data: rows });

  } catch (error) {
    console.error('❌ Get Leaves Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Leave Status
exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { comment, status, approvedBy } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status' });
  }

  if (status === 'rejected' && (!comment || comment.trim() === '')) {
    return res.status(400).json({ success: false, error: 'Comment required for rejection' });
  }

  try {
    await Leavemodel.updateLeaveStatus(id, status, approvedBy, comment || null);
    res.status(200).json({ success: true, message: `Leave ${status}` });
  } catch (error) {
    console.error('❌ Update Leave Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};
