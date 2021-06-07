const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

module.exports = router;
