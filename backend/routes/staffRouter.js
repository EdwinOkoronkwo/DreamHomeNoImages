const express = require("express");
const StaffController = require("../controllers/staffController");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // You can pass options if needed

router.get("/", StaffController.getAllStaffs);
router.get("/:staffno", StaffController.getStaffById);
router.delete("/:staffno", StaffController.deleteStaff);
router.post("/", upload.none(), StaffController.addOrUpdateStaff);
router.patch("/:staffno", upload.none(), StaffController.addOrUpdateStaff);

module.exports = router;
