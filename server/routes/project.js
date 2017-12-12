const express = require('express');
const router = express.Router();

const controller = require('../controllers/projectController.js');

router.get("/api/project", controller.getAll);
router.get("/api/project/:id", controller.get);
router.post("/api/project", controller.post);
router.put("/api/project/:id", controller.put);
router.delete("/api/project/:id", controller.remove);

module.exports = router;