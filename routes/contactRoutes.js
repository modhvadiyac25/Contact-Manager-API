const express = require("express");
const router = express.Router();
const {getContacts, createContact, putContact, getContact, deleteContact} = require("../controllers/constactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(putContact).delete(deleteContact);

// router.route("/").post(createContact);

// router.route("/:id").put(putContact);

// router.route("/:id").delete(deleteContact);

module.exports = router;
