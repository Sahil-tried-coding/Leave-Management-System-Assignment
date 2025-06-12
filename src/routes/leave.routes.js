const express = require('express');
const router = express.Router();

// ✅ Test route to confirm it’s working
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Leave API is working!' });
});

module.exports = router;
