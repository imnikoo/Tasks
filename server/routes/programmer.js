const express = require('express');
const router = express.Router();

const controller = require('../controllers/programmerController.js');

router.get("/api/programmer", controller.getAll);
router.get("/api/programmer/:id", controller.get);
router.post("/api/programmer", controller.post);
router.put("/api/programmer/:id", controller.put);
router.delete("/api/programmer/:id", controller.remove);

module.exports = router;