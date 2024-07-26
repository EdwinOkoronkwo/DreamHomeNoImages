const express = require("express");
const ClientController = require("../controllers/clientController");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // You can pass options if needed

router.get("/", ClientController.getAllClients);
router.get("/:clientno", ClientController.getClientById);
router.delete("/:clientno", ClientController.deleteClient);
router.post("/", upload.none(), ClientController.addOrUpdateClient);
router.patch("/:clientno", upload.none(), ClientController.addOrUpdateClient);

module.exports = router;
