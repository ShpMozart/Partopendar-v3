const express = require("express");
const authController = require("./../controllers/authController");
const fileController = require("./../controllers/faultWorkerFileController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post(
  "/upload",
  authController.protect,
  fileController.fields,
  fileController.save
);
router.get("/", authController.protect, fileController.getFiles);
router.get("/:id", authController.protect, fileController.downloadFile);
router.delete("/delete/:id", authController.protect, fileController.deleteFile);

module.exports = router;
