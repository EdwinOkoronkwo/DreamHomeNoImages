const express = require("express");
const multer = require("multer");
const BranchController = require("../controllers/branchController");
const router = express.Router();

// Configure multer (no options needed for form data without file uploads)
const upload = multer();

// Define routes with multer middleware
router.get("/", BranchController.getAllBranches);
router.get("/:branchno", BranchController.getBranchByBranchNo);
router.get("/branches/search", BranchController.findBranchByBranchNo);
router.delete("/:branchno", BranchController.deleteBranch);

// Use multer middleware to handle form data
router.post("/", upload.none(), BranchController.createBranch); // Handle branch creation
router.patch("/:branchno", upload.none(), BranchController.updateBranch); // Handle branch update

module.exports = router;
