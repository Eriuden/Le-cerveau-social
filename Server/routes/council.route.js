const router = require("express").Router()
const councilController = require("../controllers/council.controller")
const uploadController = require("../controllers/upload.controller")
const multer = require ("multer")
const upload = multer()

router.get("/", councilController.getAllCouncils)
router.get("/:id", councilController.getACouncil)
router.put("/:id", councilController.updateCouncil)
router.delete("/:id", councilController.deleteCouncil)
router.post("/", upload.single("file", councilController.createCouncil))
router.post("/upload-councilBanner", upload.single("file"), uploadController.uploadCouncilBanner)

module.exports = router