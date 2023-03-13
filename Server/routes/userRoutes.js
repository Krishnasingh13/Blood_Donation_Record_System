const { register, login, donateBlood, getMeDonor } = require("../controller/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getMeDonor/:donorId", getMeDonor);
router.get("/donate/:donorId/:bloodBankId", donateBlood);

module.exports = router;
