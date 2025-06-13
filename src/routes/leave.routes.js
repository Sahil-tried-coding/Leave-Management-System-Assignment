const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {applyLeave,getLeavesByStatus,updateLeaveStatus} = require("../controllers/leave.control")

router.post('/', auth, applyLeave);  

router.get('/', auth, getLeavesByStatus);

router.patch('/:id',auth,updateLeaveStatus)

router.post('/debug',(req,res)=>{
  res.json({success:true,message:"done",data:req.body})
})

// router.get('/', (req, res) => {
//   res.json({ success: true, message: 'Leave API is working!' });
// });

module.exports = router;
