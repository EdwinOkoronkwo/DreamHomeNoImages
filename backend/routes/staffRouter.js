const express = require("express");
const StaffController = require("../controllers/staffController");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // You can pass options if needed

router.get("/", StaffController.getAllStaffs);
router.get("/:staffno", StaffController.getStaffById);
router.delete("/:staffno", StaffController.deleteStaff);
// router.post("/", upload.none(), StaffController.createStaff);
// router.patch("/:staffno", upload.none(), StaffController.updateStaff);
router.post("/", upload.none(), StaffController.createStaff);
router.patch("/:staffno", upload.none(), StaffController.updateStaff);

module.exports = router;
