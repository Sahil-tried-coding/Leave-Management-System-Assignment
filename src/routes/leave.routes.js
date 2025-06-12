const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {applyLeave} = require("../Controller/leave.control")

// ✅ Test route to confirm it’s working
router.post('/', auth, applyLeave);  // 👈 This line must be there


router.post('/debug',(req,res)=>{
  res.json({success:true,message:"done",data:req.body})
})

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Leave API is working!' });
});

module.exports = router;
