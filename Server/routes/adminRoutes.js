const { register, login, createBloodBank, getAllBloodBank, getStats } = require("../controller/adminController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/createBloodBank", createBloodBank);
router.get("/getAllBloodBank", getAllBloodBank);
router.get("/getStats/:bloodBankId", getStats);

module.exports = router;
