const express = require("express");
const router = express.Router();
const {getContacts, createContact, putContact, getContact, deleteContact} = require("../controllers/constactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
console.log("[debug] : Contact Routes");
router.route("/").get(getContacts).post(createContact);
console.log("[debug] : contact routs with id");
router.route("/:id").get(getContact).put(putContact).delete(deleteContact);

// router.route("/").post(createContact);

// router.route("/:id").put(putContact);

// router.route("/:id").delete(deleteContact);

module.exports = router;